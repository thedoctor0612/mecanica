import './../vendor.ts';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ng2Webstorage } from 'ngx-webstorage';

import { MecanicaSharedModule, UserRouteAccessService } from './../shared';
import { PaginationConfig } from './../blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './';
import { StockLayoutsRoutingModule } from './layouts.routes';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { MecanicaEntityModule } from '../entities/entity.module';
import { MecanicaAdminModule } from '../admin/admin.module';

@NgModule({
    imports: [
        CommonModule,
        MecanicaSharedModule,
        MecanicaEntityModule,
        MecanicaAdminModule,
        StockLayoutsRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgxBarcodeModule
    ],
    declarations: [
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
    ],
    entryComponents: [
    ],
    providers: [
        ProfileService,
        PaginationConfig,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MecanicaLayoutsModule { }
