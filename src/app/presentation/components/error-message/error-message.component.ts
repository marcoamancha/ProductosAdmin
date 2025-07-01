import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent implements OnChanges{
  @Input() message: string = '';

  ngOnChanges() {
    if (this.message) {
      setTimeout(() => {
        this.message = '';
      }, 5000);
    }
  }
}
