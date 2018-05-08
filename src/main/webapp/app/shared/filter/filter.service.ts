
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../model/request-util';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable()
export class FilterService {

    private resourceUrl = SERVER_API_URL + 'api/';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/';

    constructor(private http: HttpClient) { }

    query(path: any, req?: any): Observable<HttpResponse<any[]>> {
        this.updateRequests(path);
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    search(path: string, req?: any): Observable<HttpResponse<any[]>> {
        this.updateRequests(path);
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }

    updateRequests(path) {
        this.resourceUrl = SERVER_API_URL + 'api/' + path;
        this.resourceSearchUrl = SERVER_API_URL + 'api/_search/' + path;
    }
}
