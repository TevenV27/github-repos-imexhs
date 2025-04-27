import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ReposService } from '../repos.service';
import { UserSidecarComponent } from '../../../shared/components/user-sidecar/user-sidecar.component';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidecarComponent],
  templateUrl: './repos-list.component.html',
})
export class ReposListComponent implements OnInit {
  username = '';
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
    this.username = this.auth.getGitHubUsername() || '';
    if (this.username) {
      this.loadRepos();
    } else {
      this.errorMsg = 'No se pudo obtener el usuario de GitHub. Por favor, vuelve a iniciar sesión.';
    }
  }

  loadRepos() {
    this.reposService.getRepos(this.username).subscribe(res => {
      this.errorMsg = (res.length === 0) ? 'No hay repositorios o hubo un error' : '';
      this.repos = res;
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

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        this.searchError = 'El usuario no existe en GitHub.';
        return;
      }
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
}
