import { Component, OnInit } from '@angular/core'; 
import { Product, SuccessResponse } from '../../../core/domain/product.model';
import { GetProducts } from '../../../core/use-cases/get-product-usecase/get-products.usecase';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductMapper } from '../../../core/domain/product-mapper';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ShareDataService } from '../../../data/services/share-data.service';
import { DeleteProduct } from '../../../core/use-cases/delete-product-usecase/delete-product.usecase';
import { ModalComponent } from '../../components/modal/modal.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, DropdownComponent, ModalComponent, ErrorMessageComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  product: Product | undefined;
  searchTerm = new FormControl('');
  filteredProducts: Product[] = [];
  itemsPerPage = new FormControl(5);
  messageResponse = '';
  showModal = false;
  selectedProductTitle: string = '';
  selectedProductId: string = '';
  pageOptions: string[] = ['5', '10', '20'];
  dropdownOptions = [
    { label: 'Editar', action: (id: string) => this.editProduct(id) },
    { label: 'Eliminar', action: (id: string) => this.deleteProduct(id) }
  ];

  constructor(private getProducts: GetProducts,
     private deleteProductUseCase: DeleteProduct,
     private datosService: ShareDataService<Product | undefined>,
     private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();

    this.searchTerm.valueChanges.subscribe((searchText) => {
      this.filterProducts(searchText!);
    });

    this.itemsPerPage.valueChanges.subscribe(() => {
      this.generatePagination();
    });
  }
  
  private loadProducts(): void {
    this.getProducts.execute().subscribe({
      next: (respuesta) => {
        this.products = respuesta.data.map(ProductMapper.toViewModel);
        this.generatePagination();
      },
      error: (err) => {
        this.messageResponse = 'Error al obtener los productos';
      }
    });
  }

  filterProducts(searchText: string) {
    if (!searchText) {
      this.generatePagination();
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  editProduct(id: string) {
    this.product = this.products.find(product => product.id === id);
    this.datosService.sharedData(this.product);
    this.router.navigate([`/products/edit/${id}`]);
  }
  
  deleteProduct(id: string) {
    this.selectedProductId = id;
    const product = this.products.find(product => product.id === id);
    this.openModal(product?.name);
  }

  openModal(productTitle?: string) {
    this.selectedProductTitle = productTitle || '';
    this.showModal = true;
  }

  onModalCancel() {
    this.showModal = false;
  }

  onModalConfirm() {
    this.showModal = false;
    this.deleteProductUseCase.execute(this.selectedProductId).subscribe({
      next: (respuesta: SuccessResponse) => {
        this.filteredProducts = this.filteredProducts.filter(product => product.id !== this.selectedProductId);
        this.messageResponse = 'Producto eliminado correctamente';
      },
      error: (err) => {
        this.messageResponse = 'Error al eliminar el producto';
      },
    });
  }
  
  generatePagination() {
    const limit = this.itemsPerPage.value || 5;
    this.filteredProducts = this.products.slice(0, limit);
  }

  goToAddProduct() {
    this.router.navigate(['/products/add']);
  }
}
