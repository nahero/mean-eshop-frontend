import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
// { environment } is the const name, and @env/environment is file name
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  apiURLcategories = environment.apiURL + 'categories';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @returns all categories from database
   */
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiURLcategories);
  }
  /**
   * Get single category by id
   */
  getCategory(categoryID: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.apiURLcategories}/${categoryID}`);
  }

  /**
   * Creates a new category
   * @param category
   */
  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiURLcategories, category);
  }

  /**
   * Update category by ID
   */
  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.apiURLcategories}/${category._id}`, category);
  }

  /**
   * Deletes a category
   * @param categoryID is category._id
   */
  deleteCategory(categoryID: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.apiURLcategories}/${categoryID}`);
  }
}
