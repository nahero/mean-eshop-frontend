import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLusers = environment.apiURL + 'users';

  constructor(private httpClient: HttpClient) {}

  /**
   * Login User
   */
  loginUser(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiURLusers}/login`, { email, password });
  }
}
