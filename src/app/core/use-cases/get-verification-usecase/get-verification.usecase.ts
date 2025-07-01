import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductRepository } from '../../domain/product.repository';

@Injectable({
    providedIn: 'root',
  })
  export class GetVerification {
    
    constructor(private repository: ProductRepository) {}
  
    execute(id: string): Observable<boolean> {
      return this.repository.getVerification(id);
    }
  }