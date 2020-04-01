import { Component, OnInit } from "@angular/core";
import { UploadingService } from 'src/app/services/uploading.service';

@Component({
    selector: 'upload-photo',
    templateUrl: './upload-photo.component.html',
    styleUrls: ['./upload-photo.component.scss']
})

export class UploadPhotoComponent implements OnInit {
    
    constructor(public uploading: UploadingService) {}

    ngOnInit() {
        
    }
}