import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Importa 'of'

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    const activatedRouteStub = {
      paramMap: of({ get: () => '123' }),
      snapshot: {
        paramMap: of({ get: () => '123' })
      }
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      declarations: [],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});