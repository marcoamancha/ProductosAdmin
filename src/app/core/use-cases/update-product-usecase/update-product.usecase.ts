import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductRepository } from "../../domain/product.repository";
import { Product } from "../../domain/product.model";

@Injectable({
    providedIn: 'root',
  })
  export class UpdateProduct {
    constructor(private repository: ProductRepository) {}
  
    execute(id: string, product: Product): Observable<Product> {
      return this.repository.updateProduct(id, product);
    }
  }