import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLusers = environment.apiURL + 'users';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @returns all users from database
   */
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURLusers);
  }
  /**
   * Get single user by id
   */
  getUserByID(userID: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiURLusers}/${userID}`);
  }

  /**
   * Creates a new user
   * @param User
   */
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURLusers, user);
  }

  /**
   * Update User by ID
   */
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiURLusers}/${user._id}`, user);
  }

  /**
   * Deletes a User
   * @param UserID is User._id
   */
  deleteUser(userID: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiURLusers}/${userID}`);
  }

  /**
   * Login User
   */
  loginUser(user: User) {
    return this.httpClient.post<User>(`${this.apiURLusers}/login`, user);
  }
}
