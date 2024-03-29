import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class FormsServices {
    accountForm: FormGroup;
    generalForm: FormGroup;
    doctorForm: FormGroup;
    signinForm: FormGroup;
    updateEmail: FormGroup;
    disableForPatient: boolean = true;
    // global validation for forms
    validationErrors:
        {
            required: string,
            notValidEmail: string,
            emailExist: string,
            minLength: string,
            notValidPhone: string,
            userType: string
            notFound: string,
            incorrectPass: string
        } = {
            required: 'required',
            notValidEmail: 'not valid email',
            userType: 'select type of account',
            emailExist: '',
            notValidPhone: 'not valid phone number',
            minLength: 'must be at least 6 characters',
            notFound: '',
            incorrectPass: ''
        };

    constructor() { }

    accountFormController() {
        this.accountForm = new FormGroup({
            'fullname': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        });
    }

    generalFormController() {
        this.generalForm = new FormGroup({
            'gender': new FormControl(null, Validators.required),
            'age': new FormControl(null, Validators.required),
            'reason': new FormControl(null)
        });
    }

    doctorFormController() {
        this.doctorForm = new FormGroup({
            'speciality': new FormControl(null, Validators.required),
            'gradFaculty': new FormControl(null, Validators.required),
            'gradYear': new FormControl(null, Validators.required),
            'usertype': new FormControl(null, Validators.required),
            'location': new FormControl(null, Validators.required),
            'fees': new FormControl(null, Validators.required)
        });
        this.usertypeControl.valueChanges.subscribe(
            (value) => {
                if (value == 'Patient') {
                    this.disableForPatient = false;
                    this.specialityControl.disable();
                    this.gYearControl.disable();
                    this.gFacultyControl.disable();
                    this.feesControl.disable();
                    this.locationControl.disable();
                    console.log(this.doctorForm.status);
                    return;
                }
                this.disableForPatient = true;
                this.specialityControl.enable();
                this.gYearControl.enable();
                this.gFacultyControl.enable();
                this.feesControl.enable();
                this.feesControl.enable();
                this.locationControl.enable();
                console.log(this.doctorForm.status);
            }
        );
    }

    signinFormController() {
        this.signinForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required)
        });
    }


    updateEmailFormController() {
        this.updateEmail = new FormGroup({
            'email': new FormControl(null, [Validators.email])
        });
    }

    

    get fullnameControl() {
        return this.accountForm.get('fullname');
    }

    get emailControl() {
        return this.accountForm.get('email');
    }

    get passwordControl() {
        return this.accountForm.get('password');
    }

    get usertypeControl() {
        return this.doctorForm.get('usertype');
    }

    get genderControl() {
        return this.generalForm.get('gender');
    }

    get ageControl() {
        return this.generalForm.get('age');
    }

    get reasonControl() {
        return this.generalForm.get('reason');
    }

    get specialityControl() {
        return this.doctorForm.get('speciality');
    }

    get gFacultyControl() {
        return this.doctorForm.get('gradFaculty');
    }

    get gYearControl() {
        return this.doctorForm.get('gradYear');
    }

    get feesControl() {
        return this.doctorForm.get('fees');
    }

    get locationControl() {
        return this.doctorForm.get('location');
    }

    get updateEmailControl() {
        return this.updateEmail.get('email');
    }

    get signinEmailControl() {
        return this.signinForm.get('email');
    }

    get signinPasswordControl() {
        return this.signinForm.get('password');
    }
}