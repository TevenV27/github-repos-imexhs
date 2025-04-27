import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.loginWithGitHub().subscribe({
      next: () => {
        // Intenta obtener el username del servicio Auth
        const username = this.auth.getGitHubUsername();
        if (username) {
          this.router.navigate(['/user', username]);
        } else {
          alert('No se pudo obtener el usuario de GitHub. Intenta de nuevo.');
        }
      },
      error: (err: any) => alert('Error al iniciar sesión: ' + err.message)
    });
  }
}
