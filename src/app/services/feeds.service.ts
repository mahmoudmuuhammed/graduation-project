import { Injectable } from "@angular/core";
import { AngularFirestore, 
        AngularFirestoreCollection, 
        AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable({
    providedIn: 'root'
})

export class FeedsService {

    postCollection: AngularFirestoreCollection<Post>;
    postDocument: AngularFirestoreDocument<Post>;
    commentCollection: AngularFirestoreCollection<Comment>;
    commentDocument: AngularFirestoreDocument<Comment>;

    currentUser: firebase.User;
    constructor(
        private db: AngularFirestore,
        private auth: AngularFireAuth
    ) {
        if(auth.auth.currentUser !== undefined && auth.auth.currentUser !== null) {
            this.currentUser = auth.auth.currentUser;
        }
    }

    getPostsInTimeline() {
        this.postCollection = this.db.collection('tests', 
        ref => { return ref.orderBy('creationTime', 'desc') });
        return this.postCollection.valueChanges();
    }

    getPostsInUserProfile() {
        this.postCollection = this.db.collection('Posts', 
        ref => { return ref.where('userId', '==', this.currentUser.uid) });
        return this.postCollection.valueChanges();
    }

    setupPost(title: string, description: string, category: string) {
        const createdId = this.db.createId();
        const data: Post = {
            postId: createdId,
            authorId: null,
            title: title,
            description: description,
            creationTime: Date.now(),
            category: category,
            postImgUrl: null,
            upvotes: {}
        };
        this.db.collection('tests')
        .doc(createdId)
        .set(data);
    }

    getComments(postId: string) {
        const path = `tests/${ postId }/comments`;
        this.commentCollection = this.db.collection(path);
        return this.commentCollection.valueChanges();
    }

    setupComment(postId: string, content: string) {
        const commentId = this.db.createId();
        const data: Comment = {
            commentId: commentId,
            creationTime: Date.now(),
            content: content,
            ownerId: 'dod'
        };
        const path = `tests/${ postId }/comments/${ commentId }`;
        this.db.doc(path).set(data);
    }

    getTotalVotesOnPost(postId: string) {
        const path = `tests/${ postId }`;
        return this.db.doc<Post>(path).valueChanges();
    }

    updateVoteOnPost(postId: string, vote: number) {
        const path = `tests/${ postId }`;
        this.db.doc<Post>(path).update({ [`upvotes.${ 'test1' }`]: vote });
    }
}