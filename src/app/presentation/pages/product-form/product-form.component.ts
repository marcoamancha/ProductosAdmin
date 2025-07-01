import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/form-utils';
import { Product } from '../../../core/domain/product.model';
import { ShareDataService } from '../../../data/services/share-data.service';
import { AddProduct } from '../../../core/use-cases/add-product.usecase/add-product.usecase';
import { GetVerification } from '../../../core/use-cases/get-verification-usecase/get-verification.usecase';
import { UpdateProduct } from '../../../core/use-cases/update-product-usecase/update-product.usecase';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  formUtils = FormUtils;
  productForm!: FormGroup;
  datoRecibido: Product | null = null;
  tituloFormulario = '';
  isEditing = false;
  productId = '';
  messageResponse = '';

  constructor(private addProduct: AddProduct,
    private updateProduct: UpdateProduct,
    private getValidation: GetVerification,
     private validator: FormBuilder,
     private dataService: ShareDataService<Product | undefined>,
     private route: ActivatedRoute,
     private router: Router){}

  ngOnInit(): void {
    this.initForm()
    this.checkEditMode();
    this.updateRevisionDate();
  }

  private initForm() {
    this.tituloFormulario = 'Formulario de registro';
    this.productForm = this.validator.group({
      id: [{value: '', disabled: this.isEditing}, [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
           [ FormUtils.checkinIdResponse(this.getValidation)]
          ],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, FormUtils.validateCurrenDate()]],
      date_revision: [{value: '', disabled: true}],
     }
    );
  }

  private checkEditMode(){
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      if (this.productId) {
        this.isEditing = true;
        this.dataService.datoActual$.subscribe((dato) => {
          if(dato){
            this.productForm.patchValue(dato);
            this.productForm.get('id')?.disable();
            this.tituloFormulario = 'Formulario de edicion';
          }     
        });
      }
    });
  }

  private updateRevisionDate(){
    this.productForm.get('date_release')?.valueChanges.subscribe((value) => {
      if (value) {
        const dateRelease = new Date(value);
        const revisionDate = new Date(dateRelease);
        revisionDate.setFullYear(dateRelease.getFullYear() + 1);
        this.productForm.get('date_revision')?.patchValue(revisionDate.toISOString().split('T')[0]);
      }
    });
  }

  onSubmit(): void {
    this.productForm.markAllAsTouched();
    const formData = this.productForm.getRawValue();

      if(this.isEditing){
        this.updateProduct.execute(this.productId, formData).subscribe({
          next: () => this.router.navigate(['/']),
          error: (error) => this.messageResponse = 'Error al actualizar el producto',
        })
      } else{
        this.addProduct.execute(formData).subscribe({
          next: () => this.router.navigate(['/']),
          error: (error) => this.messageResponse = 'Error al agregar el producto',
        });
      }
    }
  
  onReset(): void {
    this.productForm.reset();
  }
}
