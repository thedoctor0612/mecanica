import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MarqueComponent } from './marque.component';
import { MarqueDetailComponent } from './marque-detail.component';
import { MarquePopupComponent } from './marque-dialog.component';
import { MarqueDeletePopupComponent } from './marque-delete-dialog.component';

@Injectable()
export class MarqueResolvePagingParams implements Resolve<any> {

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

export const marqueRoute: Routes = [
    {
        path: 'marque',
        component: MarqueComponent,
        resolve: {
            'pagingParams': MarqueResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.marque.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'marque/:id',
        component: MarqueDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.marque.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const marquePopupRoute: Routes = [
    {
        path: 'marque-new',
        component: MarquePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.marque.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'marque/:id/edit',
        component: MarquePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.marque.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'marque/:id/delete',
        component: MarqueDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.marque.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
