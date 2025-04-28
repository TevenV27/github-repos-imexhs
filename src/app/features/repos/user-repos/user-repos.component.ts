import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserSidecarComponent } from '../../../shared/components/sidebar/user-sidebar/user-sidebar.component';
import { UserFilterComponent } from '../../../shared/components/filter/user-filter/user-filter.component';
import { RepoCardComponent } from '../../../shared/components/cards/repo-card/repo-card.component';
import { ReposService } from '../repos.service';
import { RepoModel } from '../../../shared/models/repo.model';

@Component({
  selector: 'app-user-repos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserSidecarComponent,
    UserFilterComponent,
    RepoCardComponent
  ],
  templateUrl: './user-repos.component.html',
})
export class UserReposComponent implements OnInit {
  username = '';
  allRepos: RepoModel[] = [];
  filteredRepos: RepoModel[] = [];
  paginatedRepos: RepoModel[] = [];
  languages: string[] = [];
  nameFilter = '';
  searchError = '';
  languageFilter = '';
  errorMsg = '';

  // Paginación
  currentPage = 1;
  perPage = 9;
  totalPages = 1;

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
  };

  constructor(
    private route: ActivatedRoute,
    private reposService: ReposService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
      this.currentPage = 1;
      this.fetchAllRepos();
    });
  }

  fetchAllRepos() {
    this.errorMsg = '';
    this.allRepos = [];
    this.reposService.getAllRepos(this.username).then(repos => {
      this.allRepos = repos || [];
      this.languages = [...new Set(this.allRepos.map(r => r.language).filter((l): l is string => l !== null))];
      this.applyFilters();
    }).catch(() => {
      this.errorMsg = 'Error al cargar repositorios.';
      this.allRepos = [];
      this.applyFilters();
    });
  }

  applyFilters() {
    // Reset al cambiar filtro
    this.currentPage = 1;
    this.filteredRepos = this.allRepos
      .filter(repo => repo.name?.toLowerCase().includes(this.nameFilter.toLowerCase()))
      .filter(repo => !this.languageFilter || repo.language === this.languageFilter);
    this.totalPages = Math.max(1, Math.ceil(this.filteredRepos.length / this.perPage));
    this.updatePaginatedRepos();
  }

  updatePaginatedRepos() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    this.paginatedRepos = this.filteredRepos.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedRepos();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRepos();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRepos();
    }
  }

  async onSearchUsername(username: string) {
    this.searchError = '';
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
