import { Component, OnInit } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';

@Component({
    selector: 'general-form',
    templateUrl: './general-info.component.html',
    styleUrls: ['./general-info.component.scss']
})

export class GeneralFormComponent implements OnInit {
    items: { gender: string[] } = {
        gender: ['Male', 'Female'],
    };
    constructor(public forms: FormsServices) {}

    ngOnInit() {
        this.forms.generalFormController();
    }
    generalFormSubmit() {
    }
}