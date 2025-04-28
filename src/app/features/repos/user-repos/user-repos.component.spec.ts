import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { UserReposComponent } from './user-repos.component';
import { ReposService } from '../repos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RepoModel } from '../../../shared/models/repo.model';
import { UserSidecarComponent } from '../../../shared/components/sidebar/user-sidebar/user-sidebar.component';
import { UserFilterComponent } from '../../../shared/components/filter/user-filter/user-filter.component';
import { RepoCardComponent } from '../../../shared/components/cards/repo-card/repo-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <-- IMPORTANTE

// Mock Auth provider (por si alguna dependencia usa AuthService y Firebase Auth)
import { Auth } from '@angular/fire/auth';
class MockAuth {}

describe('UserReposComponent', () => {
  let component: UserReposComponent;
  let fixture: ComponentFixture<UserReposComponent>;
  let mockReposService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  const DUMMY_REPOS: RepoModel[] = [
    {
      id: 1,
      name: 'TestRepo',
      full_name: 'user/TestRepo',
      private: false,
      stargazers_count: 4,
      forks_count: 2,
      language: 'TypeScript',
      html_url: 'https://github.com/user/TestRepo',
      description: 'Desc 1'
    },
    {
      id: 2,
      name: 'OtherRepo',
      full_name: 'user/OtherRepo',
      private: true,
      stargazers_count: 8,
      forks_count: 5,
      language: 'JavaScript',
      html_url: 'https://github.com/user/OtherRepo',
      description: null
    }
  ];

  beforeEach(async () => {
    mockReposService = {
      getAllRepos: jasmine.createSpy('getAllRepos').and.returnValue(Promise.resolve(DUMMY_REPOS)),
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    mockActivatedRoute = {
      paramMap: of({
        get: (key: string) => key === 'username' ? 'testuser' : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        UserReposComponent,
        FormsModule,
        CommonModule,
        UserSidecarComponent,
        UserFilterComponent,
        RepoCardComponent,
        HttpClientTestingModule, // <-- ¡AQUÍ! Esto soluciona el error
      ],
      providers: [
        { provide: ReposService, useValue: mockReposService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Auth, useClass: MockAuth }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el username desde route y cargar repos', fakeAsync(() => {
    spyOn(component, 'fetchAllRepos').and.callThrough();
    component.ngOnInit();
    tick();
    expect(component.username).toBe('testuser');
    expect(component.fetchAllRepos).toHaveBeenCalled();
    flush();
  }));

  it('debe cargar y filtrar repos correctamente', fakeAsync(async () => {
    await component.fetchAllRepos();
    fixture.detectChanges();
    expect(component.allRepos.length).toBe(2);
    expect(component.filteredRepos.length).toBe(2);
    expect(component.languages).toContain('TypeScript');
    expect(component.languages).toContain('JavaScript');

    // Filtra por nombre
    component.nameFilter = 'OtherRepo';
    component.applyFilters();
    fixture.detectChanges();
    expect(component.filteredRepos.length).toBe(1);
    expect(component.filteredRepos[0].name).toBe('OtherRepo');
  }));

  it('debe calcular el total de páginas correctamente', fakeAsync(async () => {
    await component.fetchAllRepos();
    component.perPage = 1;
    component.applyFilters();
    fixture.detectChanges();
    expect(component.totalPages).toBe(2);
  }));

  it('debe paginar correctamente', fakeAsync(async () => {
    await component.fetchAllRepos();
    component.perPage = 1;
    component.applyFilters();
    fixture.detectChanges();
    expect(component.paginatedRepos.length).toBe(1);
    expect(component.paginatedRepos[0].id).toBe(1);

    component.nextPage();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);
    expect(component.paginatedRepos[0].id).toBe(2);

    component.prevPage();
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
  }));

  it('goToPage no sale del rango', () => {
    component.totalPages = 2;
    component.currentPage = 1;
    component.goToPage(0);
    expect(component.currentPage).toBe(1);
    component.goToPage(3);
    expect(component.currentPage).toBe(1);
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
  });

  it('onSearchUsername redirige si el usuario existe', fakeAsync(async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({ ok: true } as any));
    await component.onSearchUsername('anotheruser');
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user', 'anotheruser']);
  }));

  it('onSearchUsername muestra error si no existe el usuario', fakeAsync(async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({ ok: false } as any));
    await component.onSearchUsername('notfound');
    fixture.detectChanges();
    expect(component.searchError).toContain('usuario no existe');
  }));

  it('clearSearchError limpia el mensaje de error', () => {
    component.searchError = 'Error';
    component.clearSearchError();
    expect(component.searchError).toBe('');
  });

  it('si getAllRepos falla, muestra error y limpia repos', fakeAsync(async () => {
    mockReposService.getAllRepos.and.returnValue(Promise.reject());

    try {
      await component.fetchAllRepos();
      tick();
    } catch (e) {
    }
  
    fixture.detectChanges();
    expect(component.errorMsg).toBe('Error al cargar repositorios.');
    expect(component.allRepos.length).toBe(0);
  }));
});
