import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product, ProductResponse, SuccessResponse } from "../../core/domain/product.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class ProductRepositoryImpl {
    
    constructor(private http: HttpClient) {}
    
    private apiUrl = environment.apiUrl; 
  
    getProducts(): Observable<ProductResponse> {
      return this.http.get<ProductResponse>(this.apiUrl);
    }
  
    addProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product);
    }

    getVerification(id: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
    }

    deleteProduct(id: string): Observable<SuccessResponse> {
      return this.http.delete<SuccessResponse>(`${this.apiUrl}/${id}`)
    }

    updateProduct(id: string, product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.apiUrl}/${id}`, product)
    }
    
  }