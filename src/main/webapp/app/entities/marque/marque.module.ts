import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MecanicaSharedModule } from '../../shared';
import {
    MarqueService,
    MarquePopupService,
    MarqueComponent,
    MarqueDetailComponent,
    MarqueDialogComponent,
    MarquePopupComponent,
    MarqueDeletePopupComponent,
    MarqueDeleteDialogComponent,
    marqueRoute,
    marquePopupRoute,
    MarqueResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...marqueRoute,
    ...marquePopupRoute,
];

@NgModule({
    imports: [
        MecanicaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MarqueComponent,
        MarqueDetailComponent,
        MarqueDialogComponent,
        MarqueDeleteDialogComponent,
        MarquePopupComponent,
        MarqueDeletePopupComponent,
    ],
    entryComponents: [
        MarqueComponent,
        MarqueDialogComponent,
        MarquePopupComponent,
        MarqueDeleteDialogComponent,
        MarqueDeletePopupComponent,
    ],
    providers: [
        MarqueService,
        MarquePopupService,
        MarqueResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MecanicaMarqueModule {}
