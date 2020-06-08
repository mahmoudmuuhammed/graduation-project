import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UploadingService } from 'src/app/services/uploading.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'upload-photo',
    templateUrl: './upload-photo.component.html',
    styleUrls: ['./upload-photo.component.scss']
})

export class UploadPhotoComponent implements OnInit {

    imgUrl: any = 'https://firebasestorage.googleapis.com/v0/b/medkitc.appspot.com/o/users%2Fman.jpg?alt=media&token=33adad58-5726-4090-b66b-cbd157593862';

    constructor(private uploadingService:UploadingService) { }

    ngOnInit() {

    }

    handlingFileUploaded(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imgUrl = reader.result;
        };
        this.uploadingService.onPhotoselect.next(file)
    }
}