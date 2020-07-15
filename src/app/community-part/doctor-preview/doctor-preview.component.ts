import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorsService } from 'src/app/services/doctors.service';
import { UserModel } from '../../models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'doctorsPreview',
  templateUrl: './doctor-preview.component.html',
  styleUrls: ['./doctor-preview.component.scss']
})
export class DoctorPreviewComponent implements OnInit {

  selectedSpeciality: string = "All"
  doctorsList;
  doctorListSnapshot: UserModel[]
  filterDoclist: UserModel[] = [];
  isSearching: boolean = false;
  @ViewChild('inputSearch') docSearch;
  showDocReservation: boolean = false;
  pointsSort: string = 'none'

  constructor(private doctorsService: DoctorsService) { }

  ngOnInit() {
    this.getDoctor();
  }

  getDoctor() {
    this.doctorsList = this.doctorsService.getDoctors();
    this.doctorsService.getDoctors().pipe(take(1)).subscribe(res => {
      this.doctorListSnapshot = res
    })
  }

  specialityFilterChange(event) {
    this.selectedSpeciality = event.target.value;
    this.getDoctor();
    this.searchFilteredDoctors();
  }

  searchFilteredDoctors() {
    this.isSearching = true
    this.filterDoclist = [];
    for (let i = 0; i < this.doctorListSnapshot.length; i++) {
      let doc = this.doctorListSnapshot[i]
      let docName = doc.fullName
      let inputText = this.docSearch.nativeElement.value
      if (this.selectedSpeciality != 'All') {
        if (docName.toLowerCase().indexOf(inputText) > -1 && doc.userType.speciality == this.selectedSpeciality) {
          this.filterDoclist.push(doc)
        }
      }
      else {
        if (docName.toLowerCase().indexOf(inputText) > -1) {
          this.filterDoclist.push(doc)
        }
      }
    }
    this.doctorsList = this.filterDoclist;
    this.sort()
  }

  pointsSortChange(event) {
    this.pointsSort = event.target.value;
    this.getDoctor();
    this.searchFilteredDoctors();
    this.sort()
  }

  sort(){
    this.pointsSort == 'Low to high' ?
    this.doctorsList.sort((a, b) => { return a.clappingCounter - b.clappingCounter }) :
    this.doctorsList.sort((a, b) => { return b.clappingCounter - a.clappingCounter })
  }

  // feesSortChange(event) {
  //   this.feesSort = event.target.value;
  //   this.getDoctor();
  //   this.searchFilteredDoctors();
  //   this.feesSort == 'Low to high' ?
  //     this.doctorsList.sort((a, b) => { return a.userType.fees - b.userType.fees }) :
  //     this.doctorsList.sort((a, b) => { return b.userType.fees - a.userType.fees })
  // }
}
