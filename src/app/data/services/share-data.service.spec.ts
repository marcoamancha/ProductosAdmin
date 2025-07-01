import { TestBed } from '@angular/core/testing';

import { ShareDataService } from './share-data.service';
import { Product } from '../../core/domain/product.model';

describe('ShareDataService', () => {
  let service: ShareDataService<Product>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })
  ;
});
