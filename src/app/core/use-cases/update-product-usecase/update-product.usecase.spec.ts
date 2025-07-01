import { Product } from '../../domain/product.model';
import { ProductRepository } from '../../domain/product.repository';
import { UpdateProduct } from './update-product.usecase';
import { of, throwError } from 'rxjs';


describe('UpdateProduct', () => {
  let useCase: UpdateProduct;
  let repositorySpy: jasmine.SpyObj<ProductRepository>;

  beforeEach(() => {
    repositorySpy = jasmine.createSpyObj('ProductRepository', ['updateProduct']);
    useCase = new UpdateProduct(repositorySpy);
  });

  it('debería actualizar un producto correctamente', () => {
    const mockId = '1';
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Descripción del producto 1',
      logo: 'logo1.png',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };

    repositorySpy.updateProduct.and.returnValue(of(mockProduct));

    useCase.execute(mockId, mockProduct).subscribe((result) => {
      expect(result).toEqual(mockProduct);
    });

    expect(repositorySpy.updateProduct).toHaveBeenCalledWith(mockId, mockProduct);
  });

  it('debería manejar errores al actualizar un producto', () => {
    const mockId = '1';
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Descripción del producto 1',
      logo: 'logo1.png',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };

    const mockError = new Error('Error al actualizar el producto');
    repositorySpy.updateProduct.and.returnValue(throwError(() => mockError));

    useCase.execute(mockId, mockProduct).subscribe({
      next: () => fail('Se esperaba un error, pero se recibió un resultado exitoso'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Error al actualizar el producto');
      },
    });
    expect(repositorySpy.updateProduct).toHaveBeenCalledWith(mockId, mockProduct);
  });
});