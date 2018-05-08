import './vendor.ts';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MecanicaSharedModule, UserRouteAccessService } from './shared';

import { ActiveMenuDirective } from './layouts/main/active-menu.directive';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutsComponent } from './layouts/layouts.component';
import { MenuItems } from './shared/menu-items/menu-items';
import { Ng2Webstorage } from 'ngx-webstorage';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { MecanicaAccountModule } from './account/account.module';
import { MecanicaAppRoutingModule } from './app-routing.module';
import { MecanicaLayoutsModule } from './layouts/layouts.module';
import { MecanicaLoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XAuthInterceptor } from './blocks/interceptor/x-auth.interceptor';
import { NgxBarcodeModule } from 'ngx-barcode';

// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        MecanicaAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        MecanicaSharedModule,
        MecanicaAccountModule,
        MecanicaLayoutsModule,
        NgxBarcodeModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        AppComponent,
        LayoutsComponent,
        MecanicaLoginComponent,
        ActiveMenuDirective
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: XAuthInterceptor,
            multi: true,
        },
        UserRouteAccessService,
        MenuItems
    ],
    bootstrap: [AppComponent]
})
export class MecanicaAppModule { }
