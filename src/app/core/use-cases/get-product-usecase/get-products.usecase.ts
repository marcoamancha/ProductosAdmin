import { Observable } from 'rxjs';
import { ProductResponse } from '../../domain/product.model';
import { Injectable } from '@angular/core';
import { ProductRepository } from '../../domain/product.repository';

@Injectable({
    providedIn: 'root',
  })
  export class GetProducts {
    
    constructor(private repository: ProductRepository) {}
  
    execute(): Observable<ProductResponse> {
      return this.repository.getProducts();
    }
  }