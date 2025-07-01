import { ProductRepository } from '../../domain/product.repository';
import { of } from 'rxjs';
import { Product, ProductResponse } from '../../domain/product.model';
import { GetProducts } from './get-products.usecase';

describe('GetProducts', () => {
  let useCase: GetProducts;
  let repositorySpy: jasmine.SpyObj<ProductRepository>;

  beforeEach(() => {
    repositorySpy = jasmine.createSpyObj('ProductRepository', ['getProducts']);
    useCase = new GetProducts(repositorySpy);
  });

  it('debería obtener los productos', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Desc 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' },
    ];
    const mockResponse: ProductResponse = { data: mockProducts }; // Respuesta de la API
    repositorySpy.getProducts.and.returnValue(of(mockResponse));

    useCase.execute().subscribe((response) => {
      expect(response.data).toEqual(mockProducts); // Verifica la propiedad "data"
    });
    expect(repositorySpy.getProducts).toHaveBeenCalled();
  });
});