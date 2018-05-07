import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MecanicaSharedModule } from '../../shared';
import {
    BlocService,
    BlocPopupService,
    BlocComponent,
    BlocDetailComponent,
    BlocDialogComponent,
    BlocPopupComponent,
    BlocDeletePopupComponent,
    BlocDeleteDialogComponent,
    blocRoute,
    blocPopupRoute,
    BlocResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...blocRoute,
    ...blocPopupRoute,
];

@NgModule({
    imports: [
        MecanicaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BlocComponent,
        BlocDetailComponent,
        BlocDialogComponent,
        BlocDeleteDialogComponent,
        BlocPopupComponent,
        BlocDeletePopupComponent,
    ],
    entryComponents: [
        BlocComponent,
        BlocDialogComponent,
        BlocPopupComponent,
        BlocDeleteDialogComponent,
        BlocDeletePopupComponent,
    ],
    providers: [
        BlocService,
        BlocPopupService,
        BlocResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MecanicaBlocModule {}
