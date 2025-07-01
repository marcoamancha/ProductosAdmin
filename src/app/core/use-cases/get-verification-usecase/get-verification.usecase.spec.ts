import { ProductRepository } from '../../domain/product.repository';
import { GetVerification } from './get-verification.usecase';
import { of, throwError } from 'rxjs';

describe('GetVerification', () => {
  let useCase: GetVerification;
  let repositorySpy: jasmine.SpyObj<ProductRepository>;

  beforeEach(() => {
    repositorySpy = jasmine.createSpyObj('ProductRepository', ['getVerification']);
    useCase = new GetVerification(repositorySpy);
  });

  it('debería verificar que un producto existe correctamente', () => {
    const mockId = '1';
    const mockResponse = true;

    repositorySpy.getVerification.and.returnValue(of(mockResponse));

    useCase.execute(mockId).subscribe((result) => {
      expect(result).toBe(mockResponse);
    });

    expect(repositorySpy.getVerification).toHaveBeenCalledWith(mockId);
  });

  it('debería manejar errores al verificar un producto', () => {
    const mockId = '1';

    const mockError = new Error('Error al verificar el producto');
    repositorySpy.getVerification.and.returnValue(throwError(() => mockError));

    useCase.execute(mockId).subscribe({
      next: () => fail('Se esperaba un error, pero se recibió un resultado exitoso'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Error al verificar el producto');
      },
    });
    expect(repositorySpy.getVerification).toHaveBeenCalledWith(mockId);
  });
});