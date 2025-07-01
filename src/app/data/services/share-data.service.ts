import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService<T> {
  private datoSource = new BehaviorSubject<T | null>(null);

  datoActual$ = this.datoSource.asObservable();

  sharedData(newDate: T) {
    this.datoSource.next(newDate);
  }
}
