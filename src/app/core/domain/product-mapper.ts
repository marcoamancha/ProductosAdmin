import { Product } from "./product.model";

export class ProductMapper {
    static toViewModel(product: Product) {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        logo: product.logo,
        date_release: product.date_release,
        date_revision: product.date_revision
      };
    }
  }