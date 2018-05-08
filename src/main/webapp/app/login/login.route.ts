import { Routes } from '@angular/router';
import { MecanicaLoginComponent } from './login.component';

export const loginRoute: Routes = [
    {
        path: 'login',
        component: MecanicaLoginComponent,
        data: {
            authorities: [],
            pageTitle: 'login.title'
        },
    }
];
