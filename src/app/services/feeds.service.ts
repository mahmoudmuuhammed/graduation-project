import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Notification } from '../models/notification.model';
import { UserModel } from '../models/user.model';
import { firestore } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})

export class FeedsService {

    postCollection: AngularFirestoreCollection<Post>;
    postDocument: AngularFirestoreDocument<Post>;
    commentCollection: AngularFirestoreCollection<Comment>;
    commentDocument: AngularFirestoreDocument<Comment>;
    notificationCollection: AngularFirestoreCollection<Notification>;
    notificationDocument: AngularFirestoreDocument<Notification>;

    currentUser: firebase.User;
    constructor(
        private db: AngularFirestore,
        private auth: AngularFireAuth,
    ) {
        if (auth.auth.currentUser !== undefined && auth.auth.currentUser !== null) {
            this.currentUser = auth.auth.currentUser;
        }
    }

    getPostsInTimeline() {
        this.postCollection = this.db.collection('Posts',
            ref => { return ref.orderBy('createdTime', 'desc') });
        return this.postCollection.valueChanges();
    }

    getPostsInUserProfile() {
        this.postCollection = this.db.collection('Posts',
            ref => { return ref.where('userId', '==', this.currentUser.uid) });
        return this.postCollection.valueChanges();
    }

    getSinglePost(postId: string) {
        this.postCollection = this.db.collection('Posts',
            ref => { return ref.where('postKey', '==', postId) })
        return this.postCollection.valueChanges();
    }

    setupPost(title: string, description: string, category: string) {
        const createdId = this.db.createId();
        const data: Post = {
            postKey: createdId,
            userID: this.auth.auth.currentUser.uid,
            title: title,
            description: description,
            createdTime: Date.now(),
            category: category,
            postPhoto: null,
            upVotes: {}
        };
        this.db.collection('Posts')
            .doc(createdId)
            .set(data);
    }

    getComments(postId: string) {
        const path = `Posts/${postId}/Comments`;
        this.commentCollection = this.db.collection(path);
        return this.commentCollection.valueChanges();
    }

    setupComment(postId: string, content: string) {
        const commentId = this.db.createId();
        const data: Comment = {
            postId:postId,
            commentId: commentId,
            createdTime: Date.now(),
            content: content,
            userName: this.auth.auth.currentUser.displayName,
            userId: this.auth.auth.currentUser.uid
        };
        const path = `Posts/${postId}/Comments/${commentId}`;
        this.db.doc(path).set(data);

        this.notificationSetup(postId)
    }

    setupClapping(postId: string, commentId: string) {
        const path = `Posts/${postId}/Comments/${commentId}`;
        this.db.doc(path).update({ clappingCounter: firestore.FieldValue.increment(1) })
    }

    getTotalVotesOnPost(postId: string) {
        const path = `Posts/${postId}`;
        return this.db.doc<Post>(path).valueChanges();
    }

    updateVoteOnPost(postId: string, vote: number) {
        const path = `Posts/${postId}`;
        this.db.doc<Post>(path).update({ [`upVotes.${this.auth.auth.currentUser.uid}`]: vote });
    }

    notificationSetup(postId: string) {
        this.db.doc<Post>(`Posts/${postId}`).valueChanges().pipe(take(1)).subscribe(docData => {
            const postUserID = docData.userID
            if (postUserID != this.auth.auth.currentUser.uid) {
                const NotificationId = this.db.createId();
                const data: Notification = {
                    createdTime: Date.now(),
                    from: this.auth.auth.currentUser.uid,
                    from_full_name: this.auth.auth.currentUser.displayName,
                    post_id: postId,
                    n_id: NotificationId,
                    message: 'has commented on your post',
                    read: false
                }
                this.db.doc(`Users/${postUserID}/Notification/${NotificationId}`).set(data)
            }
        })
    }

    getNotifications(userId: string) {
        const path = `Users/${userId}/Notification`;
        this.notificationCollection = this.db.collection(path);
        return this.notificationCollection.valueChanges();
    }

    getPostOwnerName(userId: string) {
        return this.db.collection('Users').doc(userId).valueChanges()
    }
}