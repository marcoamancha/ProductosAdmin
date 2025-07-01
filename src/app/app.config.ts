import { routes } from './app.routes';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ProductRepositoryImpl } from './data/repositories/product.repository.impl';
import { provideHttpClient } from '@angular/common/http';
import { ProductRepository } from './core/domain/product.repository';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    { provide: ProductRepository, useClass: ProductRepositoryImpl }
  ]
};
