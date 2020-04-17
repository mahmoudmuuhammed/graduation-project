import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';

@Injectable({
    providedIn: 'root'
})

export class UploadingService {
    
    fileUploaded: File;
    imgUrl: any = 'https://firebasestorage.googleapis.com/v0/b/medkitc.appspot.com/o/users%2Fman.jpg?alt=media&token=33adad58-5726-4090-b66b-cbd157593862';
    postPhotoUrl: string;

    constructor(private storage: AngularFireStorage) {}

    handlingFileUploaded(event) {
        this.fileUploaded = event.target.files[0];
        if(this.fileUploaded) {
            var filePath = `users/${ this.fileUploaded.name }`;
            var storageRef = this.storage.ref(filePath);
            var snap = storageRef.put(this.fileUploaded);
            snap
            .then(
                uploading => {
                    uploading.ref.getDownloadURL()
                    .then(
                        url => {
                            this.imgUrl = url;
                        }
                    )
                    .catch
                }
            )
        }
    }

    postPhotoUploading() {
        
    }
}