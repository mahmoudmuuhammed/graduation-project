import { Component, Renderer2 } from "@angular/core";

@Component({
    selector: 'upload-photo',
    templateUrl: './upload-photo.component.html',
    styleUrls: ['./upload-photo.component.scss']
})

export class UploadPhotoComponent {
    imgPath;
    imgUrl: any;
    constructor(private element: Renderer2) {}

    preview(files) {
        let ref = document.querySelector('.document__img');
        var reader = new FileReader();
        this.imgPath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            this.imgUrl = reader.result;
            this.element.setAttribute(ref, 'src', this.imgUrl);
        }
    }
}