import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product, ProductResponse, SuccessResponse } from '../../core/domain/product.model';
import { environment } from '../../../environments/environment';
import { ProductRepositoryImpl } from './product.repository.impl';

describe('ProductRepositoryImpl', () => {
  let repository: ProductRepositoryImpl;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductRepositoryImpl]
    });

    repository = TestBed.inject(ProductRepositoryImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get products', () => {
    const mockResponse: ProductResponse = { data: [{ id: '1', name: 'Test' } as Product] }; // Respuesta mockeada

    repository.getProducts().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add a product', () => {
    const mockProduct: Product = { id: '1', name: 'Test' } as Product;

    repository.addProduct(mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });

  it('should get verification', () => {
    const mockResponse = true;
    const id = '123';

    repository.getVerification(id).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/verification/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should delete a product', () => {
    const mockResponse: SuccessResponse = { message: 'Product removed successfully' };
    const id = '123';

    repository.deleteProduct(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should update a product', () => {
    const mockProduct: Product = { id: '1', name: 'Updated' } as Product;
    const id = '123';

    repository.updateProduct(id, mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });
  
});