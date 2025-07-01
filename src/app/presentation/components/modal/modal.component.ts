import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() productTitle: string = ''; // Título del producto
  @Output() cancel = new EventEmitter<void>(); // Evento para cancelar
  @Output() confirm = new EventEmitter<void>(); // Evento para confirmar

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
