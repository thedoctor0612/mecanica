import { Routes } from '@angular/router';
import { StockLoginComponent } from './login.component';

export const loginRoute: Routes = [
    {
        path: 'login',
        component: StockLoginComponent,
        data: {
            authorities: [],
            pageTitle: 'login.title'
        },
    }
];
