import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @returns all categories from database
   */
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('http://localhost:3000/api/v1/categories');
  }
  /**
   * Get single category by id
   */
  getCategory(categoryID: string): Observable<Category> {
    return this.httpClient.get<Category>(`http://localhost:3000/api/v1/categories/${categoryID}`);
  }

  /**
   * Creates a new category
   * @param category
   */
  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>('http://localhost:3000/api/v1/categories', category);
  }

  /**
   * Update category by ID
   */
  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`http://localhost:3000/api/v1/categories/${category._id}`, category);
  }

  /**
   * Deletes a category
   * @param categoryID is category._id
   */
  deleteCategory(categoryID: string): Observable<Category> {
    console.log(categoryID);

    return this.httpClient.delete<Category>('http://localhost:3000/api/v1/categories/' + categoryID);
  }
}
