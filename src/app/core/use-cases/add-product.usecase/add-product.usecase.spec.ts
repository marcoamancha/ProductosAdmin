
import { ProductRepository } from '../../domain/product.repository';
import { of, throwError } from 'rxjs';
import { Product } from '../../domain/product.model';
import { AddProduct } from './add-product.usecase';

describe('AddProduct', () => {
  let useCase: AddProduct;
  let repositorySpy: jasmine.SpyObj<ProductRepository>;

  beforeEach(() => {
    repositorySpy = jasmine.createSpyObj('ProductRepository', ['addProduct']);
    useCase = new AddProduct(repositorySpy);
  });

  it('debería agregar un producto correctamente', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Descripción del producto 1',
      logo: 'logo1.png',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };

    repositorySpy.addProduct.and.returnValue(of(mockProduct));

    useCase.execute(mockProduct).subscribe((result) => {
      expect(result).toEqual(mockProduct);
    });

    expect(repositorySpy.addProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('debería manejar errores al agregar un producto', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Descripción del producto 1',
      logo: 'logo1.png',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };

    const mockError = new Error('Error al agregar el producto');
    repositorySpy.addProduct.and.returnValue(throwError(() => mockError)); // Usa throwError correctamente

    useCase.execute(mockProduct).subscribe({
      next: () => fail('Se esperaba un error, pero se recibió un resultado exitoso'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Error al agregar el producto');
      },
    });

    expect(repositorySpy.addProduct).toHaveBeenCalledWith(mockProduct);
  });
});