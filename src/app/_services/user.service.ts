import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${baseUrl}/users`);
    }
   register(user: User) {
        return this.http.post(`${baseUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${baseUrl}/users/${id}`);
    }
}