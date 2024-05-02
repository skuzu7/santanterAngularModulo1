import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://crudcrud.com/api/95e90fd1d3624814b8ac01e874c0a040/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      catchError(this.handleError('fetchAllProducts'))
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError(`fetchProductById: ${id}`))
    );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, product).pipe(
      catchError(this.handleError('createProduct'))
    );
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product).pipe(
      catchError(this.handleError(`updateProduct: ${id}`))
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError(`deleteProduct: ${id}`))
    );
  }

  private handleError(operation = 'operation') {
    return (error: any): Observable<never> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error}`));
    };
  }
}
