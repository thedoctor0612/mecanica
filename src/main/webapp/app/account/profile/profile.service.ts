import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) { }

    save(newPassword: string): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/account/change-password', newPassword);
    }
}
