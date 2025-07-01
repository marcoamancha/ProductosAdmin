import { Observable } from 'rxjs';
import { Product, ProductResponse, SuccessResponse } from './product.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class ProductRepository {
  abstract getProducts(): Observable<ProductResponse>;
  abstract addProduct(product: Product): Observable<Product>;
  abstract getVerification(id: string): Observable<boolean>;
  abstract deleteProduct(id: string): Observable<SuccessResponse>;
  abstract updateProduct(id: string,  product: Product): Observable<Product>;
}