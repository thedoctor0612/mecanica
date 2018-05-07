import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Car } from './car.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Car>;

@Injectable()
export class CarService {

    private resourceUrl =  SERVER_API_URL + 'api/cars';

    constructor(private http: HttpClient) { }

    create(car: Car): Observable<EntityResponseType> {
        const copy = this.convert(car);
        return this.http.post<Car>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(car: Car): Observable<EntityResponseType> {
        const copy = this.convert(car);
        return this.http.put<Car>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Car>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Car[]>> {
        const options = createRequestOption(req);
        return this.http.get<Car[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Car[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Car = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Car[]>): HttpResponse<Car[]> {
        const jsonResponse: Car[] = res.body;
        const body: Car[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Car.
     */
    private convertItemFromServer(car: Car): Car {
        const copy: Car = Object.assign({}, car);
        return copy;
    }

    /**
     * Convert a Car to a JSON which can be sent to the server.
     */
    private convert(car: Car): Car {
        const copy: Car = Object.assign({}, car);
        return copy;
    }
}
