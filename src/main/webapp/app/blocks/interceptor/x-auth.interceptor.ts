import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { RequestOptionsArgs, Response } from '@angular/http';

import { LoginService } from '../../login/login.service';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

@Injectable()
export class XAuthInterceptor implements HttpInterceptor {

    private alertService: JhiAlertService;

    constructor(private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService,
        private eventManager: JhiEventManager,
        private injector: Injector) {
        setTimeout(() => this.alertService = injector.get(JhiAlertService));
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq;
        const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        if (!!token) {
            authReq = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + token) });
        } else {
            authReq = req.clone();
        }
        // Pass on the cloned request instead of the original request.
        return next
            .handle(authReq)
            .do((event) => { })
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse/*  && ~(event.status / 100) > 3 */) {
                    const headers = [];
                    const keys = event.headers.keys();
                    keys.forEach((name) => {
                        if (name.toLowerCase().endsWith('app-alert') || name.toLowerCase().endsWith('app-params')) {
                            headers.push(name);
                        }
                    });
                    if (headers.length > 1) {
                        headers.sort();
                        const alertKey = event.headers.get(headers[0]);
                        if (typeof alertKey === 'string') {
                            if (this.alertService) {
                                const alertParam = headers.length >= 2 ? event.headers.get(headers[1]) : null;
                                this.alertService.success(alertKey, { param: alertParam }, null);
                            }
                        }
                    }
                }
                return event;
            })
            .catch((error: any) => {
                if (!(error.status === 401 && (error.text() === '' ||
                    (error.json().path && error.json().path.indexOf('/api/account') === 0)))) {
                    if (this.eventManager !== undefined) {
                        this.eventManager.broadcast({ name: 'stockApp.httpError', content: error });
                    }
                } if (error.status === 401) {
                    const loginService: LoginService = this.injector.get(LoginService);
                    loginService.logout();
                }
                return Observable.throw(error);

            });
    }
}
