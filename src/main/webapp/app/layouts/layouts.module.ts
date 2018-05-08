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
import { StockLayoutsRoutingModule, LAYOUT_COMPONENTS, LAYOUT_ENTRIES, LAYOUT_PROVIDERS } from './layouts.routes';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
    imports: [
        CommonModule,
        MecanicaSharedModule,
        StockLayoutsRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgxBarcodeModule
    ],
    declarations: [
        LAYOUT_COMPONENTS,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
    ],
    entryComponents: [
        LAYOUT_ENTRIES
    ],
    providers: [
        LAYOUT_PROVIDERS,
        ProfileService,
        PaginationConfig,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MecanicaLayoutsModule { }
