import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadingService } from './uploading.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class FirestoreService {
    constructor(private fireDb: AngularFirestore, 
                private uploadingService: UploadingService,
                private authService: AuthService) {}

    addPostController(postBody: string, postCategory: string) {
        this.fireDb.collection('Posts').add({
            postBody: postBody,
            postCategory: postCategory,
            postPhotoUrl: this.uploadingService.postPhotoUrl,
            postOwnerId: this.authService.currentUser.uid,
            
        })
    }
}