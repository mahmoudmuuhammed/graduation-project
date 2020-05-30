import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
    selector: 'post-dashboard',
    templateUrl: './post-dashboard.component.html',
    styleUrls: ['./post-dashboard.component.scss']
})

export class PostDashboardComponent implements OnInit {
    postDashboardCase: boolean = false;
    postForm: FormGroup;
    categoriesList = [
        'Varicose Veins',
        'Influenza',
        'Bad Breath',
        'Kidney Stone',
        'Acute Pharyngitis',
        'Inflammation',
        'Arthralgia'
    ];
    constructor(private feedService: FeedsService) {}

    ngOnInit() {
        this.postFormController();
    }

    showFullForm() {
        this.postDashboardCase = true;
    }

    hideForm() {
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
        const content: string = this.postForm.get('content').value;
        this.feedService.setupPost(title, content, 'general');
        this.postForm.reset();
        this.hideForm();
    }

    resetForm() {
        this.postForm.reset();
    }
}