import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class FormsServices {
    validationErrors: 
        { required: string, 
            notValidEmail: string, 
            matching: string, 
            emailExist: string, 
            minLength: string, 
            notFound: string } = {
                required: 'required',
                notValidEmail: 'not valid email',
                matching: '',
                emailExist: '',
                minLength: 'password must be at least 6 characters',
                notFound: ''
    };


}