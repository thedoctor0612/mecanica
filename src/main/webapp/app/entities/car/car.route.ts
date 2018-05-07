import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { CarPopupComponent } from './car-dialog.component';
import { CarDeletePopupComponent } from './car-delete-dialog.component';

@Injectable()
export class CarResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const carRoute: Routes = [
    {
        path: 'car',
        component: CarComponent,
        resolve: {
            'pagingParams': CarResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'car/:id',
        component: CarDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carPopupRoute: Routes = [
    {
        path: 'car-new',
        component: CarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.car.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car/:id/edit',
        component: CarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.car.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car/:id/delete',
        component: CarDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.car.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
