import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductRepository } from "../../domain/product.repository";
import { Product } from "../../domain/product.model";

@Injectable({
    providedIn: 'root',
  })
  export class AddProduct {
    constructor(private repository: ProductRepository) {}
  
    execute(product: Product): Observable<Product> {
      return this.repository.addProduct(product);
    }
  }