import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLproducts = environment.apiURL + 'products';

  constructor(private httpClient: HttpClient) {}

  /**
   * Gets all products from database
   * @returns Product array Observable
   */
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiURLproducts);
  }

  /**
   * Gets a product by ID from database
   * @returns Product Observable
   */
  getProduct(productID: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiURLproducts}/${productID}`);
  }

  /**
   * Gets products by categories (single or multiple)
   * @param categoryIDs Single or multiple category IDs
   * @returns Product array Observable
   */
  getProductsByCategory(categoryIDs: string | string[]): Observable<Product[]> {
    const queryParams = { categories: categoryIDs };
    // alternative way but not needed as .get internally creates a HttpParams object
    const params = new HttpParams({ fromObject: queryParams });
    return this.httpClient.get<Product[]>(this.apiURLproducts, { params: queryParams });
  }

  /**
   * Creates a new product
   * @param product
   */
  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURLproducts, product);
  }

  /**
   * Creates a new product from FormData
   * @param product takes FormData object
   */
  createProductWithFormData(productData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURLproducts, productData);
  }

  /**
   * Updates a specific product by ID
   * @param product
   */
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiURLproducts}/${product._id}`, product);
  }

  /**
   * Deletes a product by ID
   * @param productID is product._id
   */
  deleteProduct(productID: string): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.apiURLproducts}/${productID}`);
  }
}
