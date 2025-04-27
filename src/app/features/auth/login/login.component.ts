import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  login() {
    this.auth.loginWithGitHub().subscribe({
      next: () => location.href = '/repos',
      error: (err: any) => alert('Error al iniciar sesión: ' + err.message)
    });
  }
}