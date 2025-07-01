import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './presentation/pages/product-list/product-list.component';
import { ProductFormComponent } from './presentation/pages/product-form/product-form.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })

export class AppRoutingModule {}
