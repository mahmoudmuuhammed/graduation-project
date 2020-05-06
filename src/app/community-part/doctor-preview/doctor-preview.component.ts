import { Component } from '@angular/core';

@Component({
  selector: 'doctorsPreview',
  templateUrl: './doctor-preview.component.html',
  styleUrls: ['./doctor-preview.component.scss']
})
export class DoctorPreviewComponent {

  selectedSpeciality: string = "All Speciality"
  docs = [1, 2, 3, 4, 5, 6, 7, 8]

  constructor() { }

  specialitySelected(event) {
    this.selectedSpeciality= event.target.innerText;
  }

}
