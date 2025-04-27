import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-filter.component.html',
})
export class UserFilterComponent {
  @Input() error: string = '';
  @Output() search = new EventEmitter<string>();
  @Output() clearError = new EventEmitter<void>();

  username: string = '';

  onSubmit() {
    this.search.emit(this.username.trim());
  }

  onInputChange() {
    this.clearError.emit();
  }
}
