import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLcategories = environment.apiURL + 'users';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @returns all users from database
   */
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURLcategories);
  }
  /**
   * Get single user by id
   */
  getUserByID(userID: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiURLcategories}/${userID}`);
  }

  /**
   * Creates a new user
   * @param User
   */
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURLcategories, user);
  }

  /**
   * Update User by ID
   */
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiURLcategories}/${user._id}`, user);
  }

  /**
   * Deletes a User
   * @param UserID is User._id
   */
  deleteUser(userID: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiURLcategories}/${userID}`);
  }
}
