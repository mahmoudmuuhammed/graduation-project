import { ProfileComponent } from './profile.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { UserProfileInfoComponent } from './user-profile-card/user-profile-info/user-profile-info.component';
import { UserProfileDataComponent } from './user-profile-card/user-profile-data/user-profile-data.component';
import { UserProfileActionsComponent } from './user-profile-card/user-profile-actions/user-profile-actions.component';

@NgModule({
    declarations: [
        ProfileComponent,
        UserProfileCardComponent,
        ProfileContentComponent,
        UserProfileInfoComponent,
        UserProfileDataComponent,
        UserProfileActionsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProfileComponent
    ]
})

export class ProfileModule {}