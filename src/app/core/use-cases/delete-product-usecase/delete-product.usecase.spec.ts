import { DeleteProduct } from './delete-product.usecase';
import { ProductRepository } from '../../domain/product.repository';
import { of, throwError } from 'rxjs';
import { SuccessResponse } from '../../domain/product.model';

describe('DeleteProduct', () => {
  let useCase: DeleteProduct;
  let repositorySpy: jasmine.SpyObj<ProductRepository>;

  beforeEach(() => {
    // Crear un mock del repositorio
    repositorySpy = jasmine.createSpyObj('ProductRepository', ['deleteProduct']);
    useCase = new DeleteProduct(repositorySpy);
  });

  it('debería eliminar un producto correctamente', () => {
    const mockId = '1';
    const mockResponse: SuccessResponse = { message: 'Product removed successfully' };

    repositorySpy.deleteProduct.and.returnValue(of(mockResponse));

    useCase.execute(mockId).subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    expect(repositorySpy.deleteProduct).toHaveBeenCalledWith(mockId);
  });

  it('debería manejar errores al eliminar un producto', () => {
    const mockId = '1';

    const mockError = new Error('Error al eliminar el producto');
    repositorySpy.deleteProduct.and.returnValue(throwError(() => mockError));

    useCase.execute(mockId).subscribe({
      next: () => fail('Se esperaba un error, pero se recibió un resultado exitoso'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Error al eliminar el producto');
      },
    });
    expect(repositorySpy.deleteProduct).toHaveBeenCalledWith(mockId);
  });
});