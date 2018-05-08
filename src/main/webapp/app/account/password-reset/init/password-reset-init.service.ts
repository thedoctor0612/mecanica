import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PasswordResetInitService {

    constructor(private http: HttpClient) {}

    save(mail: string): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/account/reset-password/init', mail);
    }
}
