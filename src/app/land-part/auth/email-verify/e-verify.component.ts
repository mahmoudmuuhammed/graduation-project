import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsServices } from 'src/app/services/forms.service';

@Component({
    selector: 'email-verification',
    templateUrl: './e-verify.component.html',
    styleUrls: ['./e-verify.component.scss']
})

export class EmailVerificationComponent implements OnInit {
    updateForm: FormGroup;
    validationErrorMessage = this.forms.validationErrors;
    constructor(private forms: FormsServices) {}

    ngOnInit() {
        this.updateFormController();
    }
    updateFormController() {
        this.updateForm = new FormGroup({
            'updatedEmail': new FormControl(null, [Validators.required, Validators.email])
        })
    }

    get updatedEmailControl() {
        return this.updateForm.get('updatedEmail');
    }
}