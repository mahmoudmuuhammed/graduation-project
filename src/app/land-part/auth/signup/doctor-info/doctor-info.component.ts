import { Component, OnInit, Renderer2 } from "@angular/core";
import { FormsServices } from 'src/app/services/forms.service';
import { HttpClient } from '@angular/common/http';
import { MapboxService } from 'src/app/services/mapbox.service';
import { Feature } from 'src/app/models/mapbox.model';

interface Check {
    prediction: number
}

@Component({
    selector: 'doctor-info',
    templateUrl: './doctor-info.component.html',
    styleUrls: ['./doctor-info.component.scss']
})

export class DoctorInfoComponent implements OnInit {
    imgSrc: string = '../../../../../assets/svgs/id-card.svg';
    prediction: number;
    checkBtn: boolean = false;
    selectedAddress: string;
    addresses: string[] = [];
    checkingMessage: string;
    base64Image: string;
    items: { type: string[] } = {
        type: ['Doctor', 'Patient']
    };
    

    constructor(public forms: FormsServices, private http: HttpClient, private mapbox: MapboxService) {}

    ngOnInit() {
        this.forms.doctorFormController();
    }

    doctorInfoSubmit() {}

    preview(event: any) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let dataUrl = reader.result.toString();
            this.imgSrc = dataUrl;
            this.base64Image = dataUrl.replace(`data:${ type };base64`,"");
        }
        reader.readAsDataURL(event.target.files[0]);
        const type = event.target.files[0].type;

        this.checkBtn = true;
    }

    checkingLicesne() {
        let message = {
            image: this.base64Image
          };
      
          this.http.post('https://id-detect.herokuapp.com/predict/', message)
          .subscribe(
            (re: Check) => {
              if(re.prediction === 0) {
                  this.checkingMessage = 'Not valid license';
              } else if (re.prediction === 1) {
                  this.checkingMessage = 'Valid license';
              }
            }
          , e => { console.log(e) })
    }

    onSearch(event: any) {
        const value = event.target.value.toLowerCase();
        if(value && value.length > 0) {
            this.mapbox.searchPlaces(value)
            .subscribe(
                (feature: Feature[]) => {
                    this.addresses = feature.map(feat => feat.place_name )
                }
            )
        } else {
            this.addresses = [];
        }
        
    }

    onSelect(address: string) {
        this.selectedAddress = address;
        this.addresses = [];
    }
}