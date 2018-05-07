import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MecanicaBlocModule } from './bloc/bloc.module';
import { MecanicaArticleModule } from './article/article.module';
import { MecanicaMarqueModule } from './marque/marque.module';
import { MecanicaCarModule } from './car/car.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MecanicaBlocModule,
        MecanicaArticleModule,
        MecanicaMarqueModule,
        MecanicaCarModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MecanicaEntityModule {}
