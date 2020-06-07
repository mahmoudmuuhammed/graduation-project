import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedsService } from 'src/app/services/feeds.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Component({
    selector: 'post-dashboard',
    templateUrl: './post-dashboard.component.html',
    styleUrls: ['./post-dashboard.component.scss']
})

export class PostDashboardComponent implements OnInit {
    postDashboardCase: boolean = false;
    postForm: FormGroup;
    Category: string = 'General';
    isImgExist: boolean = false;
    imageInput: {};
    imageInputSrc;
    constructor(private feedService: FeedsService,
        private fStorage: AngularFireStorage) { }

    ngOnInit() {
        this.postFormController();
    }

    showFullForm() {
        this.postDashboardCase = true;
    }

    hideForm() {
        this.isImgExist = false;
        this.imageInput = {};
        this.imageInputSrc = "";
        this.postDashboardCase = false;
        this.postForm.reset();
    }

    postFormController() {
        this.postForm = new FormGroup({
            'title': new FormControl(null, Validators.required),
            'content': new FormControl(null),
        });
    }

    handleAddPost() {
        const title: string = this.postForm.get('title').value;
        var content: string = this.postForm.get('content').value;
        content = null ? content = "" : '';
        this.feedService.setupPost(title, content, this.Category, this.isImgExist, this.imageInput);
        this.Category = 'General'
        this.postForm.reset();
        this.hideForm();
    }

    resetForm() {
        this.postForm.reset();
    }

    categorySelection(event) {
        this.Category = event.target.value
    }

    chooseImg(file: File) {
        this.imageInput = file;
        this.isImgExist = true;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imageInputSrc = reader.result;
        };
    }
}