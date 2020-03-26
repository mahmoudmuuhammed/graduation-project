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