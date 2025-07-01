import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductRepository } from '../../domain/product.repository';
import { SuccessResponse } from '../../domain/product.model';

@Injectable({
    providedIn: 'root',
  })
  export class DeleteProduct {
    
    constructor(private repository: ProductRepository) {}
  
    execute(id: string): Observable<SuccessResponse> {
      return this.repository.deleteProduct(id);
    }
}