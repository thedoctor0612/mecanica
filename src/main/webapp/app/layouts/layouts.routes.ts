import { errorRoute } from './error/error.route';
import { UserRouteAccessService } from './../shared/auth/user-route-access-service';
import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';

@NgModule({
    imports: [
        RouterModule
    ],
    exports: [
        RouterModule
    ]
})
export class StockLayoutsRoutingModule { }
