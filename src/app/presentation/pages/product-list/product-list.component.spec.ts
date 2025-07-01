import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { GetProducts } from '../../../core/use-cases/get-product-usecase/get-products.usecase';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Product, ProductResponse, SuccessResponse } from '../../../core/domain/product.model';
import { ShareDataService } from '../../../data/services/share-data.service';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { DeleteProduct } from '../../../core/use-cases/delete-product-usecase/delete-product.usecase';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let deleteProductUseCase: DeleteProduct;
  let router: Router;
  let dataService: ShareDataService<Product | undefined>;

  beforeEach(async () => {
    const mockProductResponse: ProductResponse = {
      data: [
        { id: '1', name: 'Test Product 1', description: 'Test Description 1' }, // Objeto literal
        { id: '2', name: 'Test Product 2', description: 'Test Description 2' }, // Objeto literal
      ] as Product[] // Castea a Product[]
    };

    const getProductsMock = {
      execute: () => of(mockProductResponse)
    };

    const deleteProductMock = {
      execute: () => of({ success: true, message: 'Product deleted' } as SuccessResponse)
    };

    const routerMock = {
      navigate: () => Promise.resolve()
    };

    const dataServiceMock = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      sharedData: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, ProductListComponent, DropdownComponent], // Importa ReactiveFormsModule, CommonModule y declara DropdownComponent
      declarations: [],
      providers: [
        { provide: GetProducts, useValue: getProductsMock },
        { provide: DeleteProduct, useValue: deleteProductMock },
        { provide: Router, useValue: routerMock },
        { provide: ShareDataService, useValue: dataServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    deleteProductUseCase = TestBed.inject(DeleteProduct);
    router = TestBed.inject(Router);
    dataService = TestBed.inject(ShareDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2); // Verifica que filteredProducts también se inicializa
  });

  it('should filter products', () => {
    component.searchTerm.setValue('1');
    expect(component.filteredProducts.length).toBe(1);

    component.searchTerm.setValue(''); // Limpia la búsqueda
    expect(component.filteredProducts.length).toBe(2); // Debe volver a mostrar todos los productos
  });

  it('should edit a product', () => {
    const productId = '1';
    spyOn(router, 'navigate');
    spyOn(dataService, 'sharedData');

    component.editProduct(productId);

    expect(dataService.sharedData).toHaveBeenCalledWith(component.products.find(p => p.id === productId));
    expect(router.navigate).toHaveBeenCalledWith([`/products/edit/${productId}`]);
  });


  it('should delete a product', () => {
    const productId = '1';
    spyOn(deleteProductUseCase, 'execute').and.returnValue(of({ success: true, message: 'Product deleted' })); // Simula la respuesta exitosa
  
    component.filteredProducts = [
      {
        id: '1', name: 'Test Product 1', description: 'Test Description 1',
        logo: '',
        date_release: '',
        date_revision: ''
      },
      {
        id: '2', name: 'Test Product 2', description: 'Test Description 2',
        logo: '',
        date_release: '',
        date_revision: ''
      },
    ]; // Inicializa los productos filtrados
  
    component.deleteProduct(productId); // Llama al método para eliminar el producto
    component.onModalConfirm(); // Simula la confirmación del modal
  
    expect(deleteProductUseCase.execute).toHaveBeenCalledWith(productId); // Verifica que el método fue llamado con el ID correcto
    expect(component.filteredProducts.length).toBe(1); // Verifica que un producto fue eliminado
    expect(component.messageResponse).toBe('Producto eliminado correctamente'); // Verifica que el mensaje se actualizó correctamente
  });

  it('should handle delete product error', () => {
    spyOn(deleteProductUseCase, 'execute').and.returnValue(
      throwError(() => new Error('Error deleting product'))
    );
  
    component.selectedProductId = '123'; // Simula un ID de producto
    component.onModalConfirm(); // Llama al método para confirmar eliminación
  
    expect(component.messageResponse).toBe('Error al eliminar el producto'); // Verifica que el mensaje de error se actualizó correctamente
  });

  it('should navigate to add product', () => {
    spyOn(router, 'navigate');

    component.goToAddProduct();

    expect(router.navigate).toHaveBeenCalledWith(['/products/add']);
  });

  it('should generate pagination', () => {
    component.itemsPerPage.setValue(1);
    component.generatePagination();
    expect(component.filteredProducts.length).toBe(1);

    component.itemsPerPage.setValue(5); // Restablece el valor
    component.generatePagination();
    expect(component.filteredProducts.length).toBe(2); // Debe mostrar todos los productos
  });
});