import { Component } from "@angular/core";

@Component({
    selector: 'uploading',
    templateUrl: './uploading.component.html',
    styleUrls: ['./uploading.component.scss']
})

export class UploadingComponent {

    file: File;

    onPreviewFileUploaded(event) {
        this.file = event.target.files;
        console.log(this.file);
    }
}