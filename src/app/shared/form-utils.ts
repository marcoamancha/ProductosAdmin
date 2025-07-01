import { AbstractControl, AsyncValidatorFn, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { map, Observable} from 'rxjs';
import { GetVerification } from '../core/use-cases/get-verification-usecase/get-verification.usecase';

export class FormUtils {

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'maxlength':
          return `Máximo de ${errors['maxlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'idError':
          return 'El id ya existe'
        
        default:
          return 'Verifique el campo ingresado'
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static validateCurrenDate(){
    return (date: AbstractControl) => {
      const dateEntered = new Date(date.value + 'T00:00:00');
      const currentDate = new Date();

      dateEntered.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
  
      return dateEntered >= currentDate ? null : { dateNotEqual: true };
    };
  }

  static checkinIdResponse(getValidation: GetVerification): AsyncValidatorFn{
    return (id: AbstractControl):  Observable<ValidationErrors | null> => {
      return getValidation.execute(id.value).pipe(
        map((existsId: boolean) => {
          return existsId ? { idError: true } : null;
        })
      );  
    } 
  }
}
