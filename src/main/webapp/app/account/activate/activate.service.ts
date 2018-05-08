import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class ActivateService {

    constructor(private http: HttpClient) {}

    get(key: string): Observable<any> {
        const options = new HttpParams();
        options.set('key', key);

        return this.http.get(SERVER_API_URL + 'api/activate', {
            params: options
        });
    }
}
