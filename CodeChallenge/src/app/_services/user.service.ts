﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    sendEmail(user: User) {
        return this.http.post(`${environment.mailUrl}/mail/sendMail`, user);
    }
}