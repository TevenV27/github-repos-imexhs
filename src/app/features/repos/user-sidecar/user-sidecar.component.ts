import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidecar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-sidecar.component.html',
})
export class UserSidecarComponent implements OnInit {
  @Input() name = '';
  @Input() username = '';
  @Input() email = '';
  @Input() avatar = '';
  @Input() stars = 0;

  isDarkMode = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ){}

  ngOnInit() {
    const userPref = localStorage.getItem('theme');
    if (userPref) {
      this.isDarkMode = userPref === 'dark';
      this.updateThemeClass();
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.updateThemeClass();
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateThemeClass();
  }

  updateThemeClass() {
    const root = document.documentElement;
    if (this.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
  logout() {
    this.auth.logout().subscribe(() => {
      localStorage.removeItem('githubUserInfo');
      localStorage.removeItem('githubUsername');
      this.router.navigate(['/login']);
    });
  }
}
