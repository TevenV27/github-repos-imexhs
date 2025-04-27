import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidecarComponent } from '../user-sidecar/user-sidecar.component';
import { AuthService } from '../../../core/services/auth.service';
import { ReposService } from '../repos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidecarComponent],
  templateUrl: './repos-list.component.html',
})


export class ReposListComponent implements OnInit {
  username = '';
  name = '';
  email = '';
  avatar = '';
  stars = 0;
  repos: any[] = [];
  filteredRepos: any[] = [];
  languages: string[] = [];
  nameFilter = '';
  searchUsername = '';
  searchError = '';
  languageFilter = '';
  errorMsg = '';

  languageColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    Shell: '#89e051',
    PHP: '#4F5D95',
    Ruby: '#701516',
    C: '#555555',
    'C++': '#f34b7d',
    CSharp: '#178600',
    Go: '#00ADD8',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Swift: '#FFAC45',
    Rust: '#dea584',
    Scala: '#c22d40',
    Vue: '#41b883',
    VueJS: '#41b883',
    Angular: '#dd0031',
    Svelte: '#ff3e00',
    ObjectiveC: '#438eff',
    'Objective-C': '#438eff',
    // ...agrega más según necesites
  };

  constructor(
    private auth: AuthService,
    private reposService: ReposService,
    private router: Router
  ) {}

  ngOnInit() {
    // Extrae datos de usuario de localStorage si están disponibles
    const userInfo = JSON.parse(localStorage.getItem('githubUserInfo') || '{}');
    this.username = this.auth.getGitHubUsername() || userInfo.login || '';
    this.name = userInfo.name || '';
    this.email = userInfo.email || '';
    this.avatar = userInfo.avatar_url || '';
    this.stars = 0;

    if (this.username) {
      this.loadRepos();
    } else {
      this.errorMsg = 'No se pudo obtener el usuario de GitHub. Por favor, vuelve a iniciar sesión.';
    }
  }

  async loadRepos() {
    this.reposService.getRepos(this.username).subscribe(res => {
      this.errorMsg = (res.length === 0) ? 'No hay repositorios o hubo un error' : '';
      this.repos = res;
      this.stars = this.repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      this.languages = [...new Set(this.repos.map(r => r.language).filter(Boolean))];
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredRepos = this.repos
      .filter(repo => repo.name.toLowerCase().includes(this.nameFilter.toLowerCase()))
      .filter(repo => !this.languageFilter || repo.language === this.languageFilter);
  }

  async goToUser() {
    this.searchError = '';
    const username = this.searchUsername.trim();
  
    if (!username) return;
  
    // Llama a la API de GitHub para verificar si el usuario existe
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        this.searchError = 'El usuario no existe en GitHub.';
        return;
      }
      // Si existe, redirecciona
      this.router.navigate(['/user', username]);
    } catch (e) {
      this.searchError = 'Error de red de GitHub. Intenta de nuevo.';
    }
  }
  clearSearchError() {
    if (this.searchError) {
      this.searchError = '';
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