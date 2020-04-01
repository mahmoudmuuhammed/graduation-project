import { Component, OnInit, Renderer2 } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';

@Component({
    selector: 'doctor-info',
    templateUrl: './doctor-info.component.html',
    styleUrls: ['./doctor-info.component.scss']
})

export class DoctorInfoComponent implements OnInit {
    imgPath;
    imgUrl: any;
    items: { type: string[] } = {
        type: ['Doctor', 'Patient']
    }

    constructor(public forms: FormsServices, private element: Renderer2) {}

    ngOnInit() {
        this.forms.doctorFormController();
    }

    doctorInfoSubmit() {}

    preview() {
    }
}