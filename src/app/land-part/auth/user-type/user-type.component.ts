import { Component } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'user-type',
    template: `
        <section class="usertype">
            <div class="content">
                <doctor-info></doctor-info>
                <button 
                    class="submit" 
                    (click)="completeSubmitForProviders()">Create account</button>
            </div>
        </section>
    `,
    styles: [`
        .usertype {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
        }
        
        .content {
            width: 400px;
            padding: 1em;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .submit {
            border: none;
            padding: .5em 1em;
            text-align: center;
            background-color: #764BCB;
            color: #fff;
            border-radius: 5px;
            font-size: 15px;
            font-weight: 400px;
        }

    
    `]
})

export class UserTypeComponent {

    constructor(private authService: AuthService) {}
    completeSubmitForProviders() {
        // this.authService.userTypeAfterProvider();
    }
}