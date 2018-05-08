import { MecanicaLoginComponent } from './login/login.component';
import { UserRouteAccessService } from './shared/auth/user-route-access-service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { errorRoute } from './layouts';
import { loginRoute } from './login/login.route';

const routes: Routes = [
    { path: 'login', component: MecanicaLoginComponent },
    { path: '', redirectTo: '/article', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class MecanicaAppRoutingModule { }
