import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { SharedCommunityModule } from '../Shared/sharedCommunity.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';
import { UserProfileInfoComponent } from './user-profile-card/user-profile-info/user-profile-info.component';
import { UserProfileDataComponent } from './user-profile-card/user-profile-data/user-profile-data.component';
import { UserProfileActionsComponent } from './user-profile-card/user-profile-actions/user-profile-actions.component';
import { DoctorInfComponent } from './user-profile-card/doctor-inf/doctor-inf.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        ProfileComponent,
        UserProfileCardComponent,
        UserProfileInfoComponent,
        UserProfileDataComponent,
        UserProfileActionsComponent,
        DoctorInfComponent,
        ProfileContentComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        SharedCommunityModule,
        RouterModule
    ],
    exports: [
        ProfileComponent
    ]
})

export class ProfileModule { }