import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';

@Component({
    selector: 'account-form',
    templateUrl: './account-form.component.html',
    styleUrls: ['./account-form.component.scss']
})

export class AccountFormComponent implements OnInit {

    constructor(public forms: FormsServices) {}

    ngOnInit() {
        this.forms.accountFormController();
    }

    accountFormSubmit() {
    }
}