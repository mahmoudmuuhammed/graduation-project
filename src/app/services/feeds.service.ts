import { Injectable, EventEmitter } from "@angular/core";
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
import { AngularFireStorage } from '@angular/fire/storage';

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
    filteredPostCategory = new EventEmitter<string>();

    constructor(private db: AngularFirestore,
        private auth: AngularFireAuth,
        private fStorage: AngularFireStorage) {
        if (auth.auth.currentUser !== undefined && auth.auth.currentUser !== null) {
            this.currentUser = auth.auth.currentUser;
        }
    }

    getPostsInTimeline(category: string) {
        if (category == 'All') {
            this.postCollection = this.db.collection('Posts', ref => { return ref.orderBy('createdTime', 'desc') });
        }
        else {
            this.postCollection = this.db.collection('Posts', ref => {
                return ref.orderBy('createdTime', 'desc')
                    .where('category', '==', category)
            });
        }
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

    setupPost(title: string, description: string, category: string, isImg: boolean, img: {}) {
        const createdId = this.db.createId();
        const data: Post = {
            postKey: createdId,
            userID: this.auth.auth.currentUser.uid,
            userName: this.auth.auth.currentUser.displayName,
            title: title,
            description: description,
            createdTime: Date.now(),
            category: category,
            postPhoto: isImg,
            upVotes: {},
            commentCounter:0
        };
        if (isImg) {
            this.fStorage.ref(`postImages/${createdId}`).put(img).then(() => {
                this.db.collection('Posts').doc(createdId).set(data);
            })
        }
        else {
            this.db.collection('Posts').doc(createdId).set(data);
        }

    }

    getPostImgSrc(postId: string) {
        return this.fStorage.ref(`postImages/${postId}`).getDownloadURL()
    }

    getComments(postId: string) {
        this.commentCollection = this.db.collection(`Posts/${postId}/Comments`,
            ref => { return ref.orderBy('createdTime', 'desc') });
        return this.commentCollection.valueChanges();
    }

    setupComment(postId: string, content: string) {
        const commentId = this.db.createId();
        const data: Comment = {
            postId: postId,
            commentId: commentId,
            userId: this.auth.auth.currentUser.uid,
            userName: this.auth.auth.currentUser.displayName,
            createdTime: Date.now(),
            content: content,
            clappings: {},
        };
        const path = `Posts/${postId}/Comments/${commentId}`;
        this.db.doc(path).set(data);

        this.db.doc(`Posts/${postId}`).update({commentCounter:firestore.FieldValue.increment(1)})

        this.notificationSetup(postId)
    }

    setupClapping(postId: string, commentId: string, clapValue: number) {
        const path = `Posts/${postId}/Comments/${commentId}`;
        this.db.doc<Comment>(path).update({ [`clappings.${this.auth.auth.currentUser.uid}`]: clapValue });
    }

    getTotalVotesOnPost(postId: string) {
        const path = `Posts/${postId}`;
        return this.db.doc<Post>(path).valueChanges();
    }

    updateVoteOnPost(postId: string, vote: number) {
        const path = `Posts/${postId}`;
        this.db.doc<Post>(path).update({ [`upVotes.${this.auth.auth.currentUser.uid}`]: vote });
    }

    getTotalClapping(postId: string, commentId: string) {
        const path = `Posts/${postId}/Comments/${commentId}`;
        return this.db.doc<Comment>(path).valueChanges();
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
        this.notificationCollection = this.db.collection(`Users/${userId}/Notification`,
            ref => { return ref.orderBy('createdTime', 'desc') });
        return this.notificationCollection.valueChanges();
    }

    changeNotificationReadState(notificationId: string, userId: string) {
        const path = `Users/${userId}/Notification/${notificationId}`
        this.notificationDocument = this.db.doc(path);
        this.notificationDocument.update({ read: true })
    }

    deletePost(postId: string) {
        const path = `Posts/${postId}`
        this.postDocument = this.db.doc(path);
        this.postDocument.delete()
    }

    deleteComment(postId: string, commentId: string) {
        const path = `Posts/${postId}/Comments/${commentId}`
        this.postDocument = this.db.doc(path);
        this.postDocument.delete()
    }
}