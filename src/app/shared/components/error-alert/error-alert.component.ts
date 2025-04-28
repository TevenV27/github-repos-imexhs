import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-alert.component.html',
})
export class ErrorAlertComponent {
  @Input() message: string = '';
  @Input() show: boolean = true; // Permite control externo para animar salida
  @Output() close = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }
}