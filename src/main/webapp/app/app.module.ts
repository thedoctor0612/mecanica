import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { MecanicaSharedModule, UserRouteAccessService } from './shared';
import { MecanicaAppRoutingModule } from './app-routing.module';
import { MecanicaHomeModule } from './home/home.module';
import { MecanicaAdminModule } from './admin/admin.module';
import { MecanicaAccountModule } from './account/account.module';
import { MecanicaEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import { MecanicaLayoutsModule } from './layouts/layouts.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { LayoutsComponent } from './layouts/layouts.component';
import { AppComponent } from './app.component';
import { MecanicaLoginComponent } from './login/login.component';
import { MenuItems } from './shared/menu-items/menu-items';
import { XAuthInterceptor } from './blocks/interceptor/x-auth.interceptor';

@NgModule({
    imports: [
        BrowserModule,
        MecanicaAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        MecanicaSharedModule,
        MecanicaHomeModule,
        MecanicaAdminModule,
        MecanicaAccountModule,
        MecanicaEntityModule,
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
