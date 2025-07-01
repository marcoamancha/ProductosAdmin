import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { CommonModule } from '@angular/common';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DropdownComponent],
    });
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería abrir y cerrar el dropdown', () => {
    expect(component.isOpen).toBeFalse();

    component.toggleDropdown();
    expect(component.isOpen).toBeTrue();

    component.toggleDropdown();
    expect(component.isOpen).toBeFalse();
  });

  it('debería seleccionar una opción y cerrar el dropdown', () => {
    const mockAction = jasmine.createSpy('action');
    component.options = [{ label: 'Opción 1', action: mockAction }];
    component.id = '1';

    component.isOpen = true;
    fixture.detectChanges();

    component.selectOption(mockAction);

    expect(mockAction).toHaveBeenCalledWith('1');


    expect(component.isOpen).toBeFalse();
  });

  it('debería cerrar el dropdown al hacer clic fuera', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const event = new MouseEvent('click', { bubbles: true });
    document.dispatchEvent(event);

    expect(component.isOpen).toBeFalse();
  });

  it('no debería cerrar el dropdown al hacer clic dentro', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const dropdownElement = fixture.nativeElement.querySelector('.dropdown');
    const event = new MouseEvent('click', { bubbles: true });
    dropdownElement.dispatchEvent(event);

    expect(component.isOpen).toBeTrue();
  });
});