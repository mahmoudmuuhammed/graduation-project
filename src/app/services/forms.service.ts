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
        { required: string, 
            notValidEmail: string,
            emailExist: string, 
            minLength: string,
            notValidPhone: string,
            userType: string
            notFound: string,
            incorrectPass: string } = {
                required: 'required',
                notValidEmail: 'not valid email',
                userType: 'select type of account',
                emailExist: '',
                notValidPhone: 'not valid phone number',
                minLength: 'must be at least 6 characters',
                notFound: '',
                incorrectPass: ''
    };

    constructor() {}

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
            'specialty': new FormControl(null, Validators.required),
            'g-faculty': new FormControl(null, Validators.required),
            'g-year': new FormControl(null, Validators.required),
            'usertype': new FormControl(null, Validators.required),
            'location': new FormControl(null, Validators.required)
        });
        this.usertypeControl.valueChanges.subscribe(
            (value) => {
                if(value == 'Patient'){
                    this.disableForPatient = false;
                    this.specialtyControl.disable();
                    this.gYearControl.disable();
                    this.gFacultyControl.disable();
                    console.log(this.doctorForm.status);
                    return;
                }
                this.disableForPatient = true;
                this.specialtyControl.enable();
                this.gYearControl.enable();
                this.gFacultyControl.enable();
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

    get specialtyControl() {
        return this.doctorForm.get('specialty');
    }
    
    get gFacultyControl() {
        return this.doctorForm.get('g-faculty');
    }
    
    get gYearControl() {
        return this.doctorForm.get('g-year');
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