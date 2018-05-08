import { LoginService } from '../login/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from './../layouts/main/title/title.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';
import { ToggleFullScreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    FilterComponent,

    MecanicaSharedLibsModule,
    MecanicaSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    PrintService,
    FilterService,
    StateStorageService,
    Principal,
    HasAnyAuthorityDirective,
} from './';
import { HttpClientModule } from '@angular/common/http';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MecanicaSharedLibsModule,
        MecanicaSharedCommonModule,
        PerfectScrollbarModule
    ],
    declarations: [
        ToggleFullScreenDirective,
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        CardToggleDirective,
        TitleComponent,
        CardComponent,
        ModalBasicComponent,
        ModalAnimationComponent,
        SpinnerComponent,
        FilterComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        PrintService,
        FilterService,
        DatePipe
    ],
    entryComponents: [],
    exports: [
        BrowserAnimationsModule,
        ToggleFullScreenDirective,
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        CardToggleDirective,
        HttpClientModule,
        TitleComponent,
        CardComponent,
        ModalBasicComponent,
        ModalAnimationComponent,
        SpinnerComponent,
        FilterComponent,
        ClickOutsideModule,
        MecanicaSharedCommonModule,
        HasAnyAuthorityDirective,
        DatePipe,
        PerfectScrollbarModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MecanicaSharedModule { }
