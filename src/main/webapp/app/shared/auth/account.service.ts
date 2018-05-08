import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class AccountService  {
    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        return this.http.get<any>(SERVER_API_URL + 'api/account');
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(SERVER_API_URL + 'api/account', account);
    }
}
