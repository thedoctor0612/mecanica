import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Marque } from './marque.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Marque>;

@Injectable()
export class MarqueService {

    private resourceUrl =  SERVER_API_URL + 'api/marques';

    constructor(private http: HttpClient) { }

    create(marque: Marque): Observable<EntityResponseType> {
        const copy = this.convert(marque);
        return this.http.post<Marque>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(marque: Marque): Observable<EntityResponseType> {
        const copy = this.convert(marque);
        return this.http.put<Marque>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Marque>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Marque[]>> {
        const options = createRequestOption(req);
        return this.http.get<Marque[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Marque[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Marque = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Marque[]>): HttpResponse<Marque[]> {
        const jsonResponse: Marque[] = res.body;
        const body: Marque[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Marque.
     */
    private convertItemFromServer(marque: Marque): Marque {
        const copy: Marque = Object.assign({}, marque);
        return copy;
    }

    /**
     * Convert a Marque to a JSON which can be sent to the server.
     */
    private convert(marque: Marque): Marque {
        const copy: Marque = Object.assign({}, marque);
        return copy;
    }
}
