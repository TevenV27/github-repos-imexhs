import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ErrorAlertComponent } from '../../error-alert/error-alert.component';

@Component({
  selector: 'app-user-sidecar',
  standalone: true,
  imports: [CommonModule, ErrorAlertComponent ],
  templateUrl: './user-sidebar.component.html',
})
export class UserSidecarComponent implements OnInit, OnChanges {
  @Input() username = '';

  name = '';
  email = '';
  avatar = '';
  stars = 0;
  location = '';
  publicRepos = 0;
  followers = 0;
  following = 0;
  createAt = '';
  bio = '';

  isDarkMode = false;
  loading = false;
  errorMsg = '';

  avatarFallback = 'https://avatars.githubusercontent.com/u/583231?v=4';  // Image default

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit() {
    this.setupTheme();
    if (this.username) {
      this.loadUserProfile(this.username);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['username'] && this.username) {
      this.loadUserProfile(this.username);
    }
  }

  loadUserProfile(username: string) {
    this.loading = true;
    this.errorMsg = '';
    this.userService.getUserData(username).subscribe((user: any) => {
      this.loading = false;
      if (user && user.avatar_url) {
        this.name = user.name || '';
        this.bio = user.bio || '';
        this.email = user.email || '';
        this.avatar = user.avatar_url || '';
        this.location = user.location || '';
        this.publicRepos = user.public_repos || 0;
        this.followers = user.followers || 0;
        this.following = user.following || 0;
        this.createAt = user.created_at || '';
      } else {
        this.errorMsg = 'No se pudo cargar el perfil de usuario.';
      }
    }, () => {
      this.loading = false;
      this.errorMsg = 'No se pudo cargar el perfil de usuario.';
    });
  }

  setupTheme() {
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
