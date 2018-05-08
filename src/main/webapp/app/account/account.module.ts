import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MecanicaSharedModule } from '../shared';

import {
    ActivateService,
    PasswordService,
    ProfileService,
    PasswordResetInitService,
    PasswordResetFinishService,
    PasswordStrengthBarComponent,
    ActivateComponent,
    PasswordComponent,
    ProfileComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';

@NgModule({
    imports: [
        MecanicaSharedModule,
        RouterModule.forChild(accountState)
    ],
    declarations: [
        ActivateComponent,
        PasswordComponent,
        ProfileComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent
    ],
    providers: [
        ActivateService,
        PasswordService,
        PasswordResetInitService,
        PasswordResetFinishService,
        ProfileService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MecanicaAccountModule { }
