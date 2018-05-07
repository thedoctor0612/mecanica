import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BlocComponent } from './bloc.component';
import { BlocDetailComponent } from './bloc-detail.component';
import { BlocPopupComponent } from './bloc-dialog.component';
import { BlocDeletePopupComponent } from './bloc-delete-dialog.component';

@Injectable()
export class BlocResolvePagingParams implements Resolve<any> {

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

export const blocRoute: Routes = [
    {
        path: 'bloc',
        component: BlocComponent,
        resolve: {
            'pagingParams': BlocResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.bloc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bloc/:id',
        component: BlocDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.bloc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blocPopupRoute: Routes = [
    {
        path: 'bloc-new',
        component: BlocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.bloc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bloc/:id/edit',
        component: BlocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.bloc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bloc/:id/delete',
        component: BlocDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mecanicaApp.bloc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
