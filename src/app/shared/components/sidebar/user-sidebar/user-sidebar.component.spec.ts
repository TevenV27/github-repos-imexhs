import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSidecarComponent } from './user-sidebar.component';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

class MockAuthService {
  logout = jasmine.createSpy().and.returnValue(of(true));
}
class MockUserService {
  getUserData = jasmine.createSpy().and.returnValue(of({
    name: 'Steven',
    bio: 'Frontend Dev',
    email: 'steven@demo.com',
    avatar_url: 'https://avatars.githubusercontent.com/u/102372427?v=4',
    location: 'Cali, Colombia',
    public_repos: 15,
    followers: 12,
    following: 3,
    created_at: '2020-06-10T00:00:00Z'
  }));
}
class MockRouter {
  navigate = jasmine.createSpy();
}

describe('UserSidecarComponent', () => {
  let component: UserSidecarComponent;
  let fixture: ComponentFixture<UserSidecarComponent>;
  let mockAuth: MockAuthService;
  let mockUser: MockUserService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSidecarComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSidecarComponent);
    component = fixture.componentInstance;
    mockAuth = TestBed.inject(AuthService) as any;
    mockUser = TestBed.inject(UserService) as any;
    mockRouter = TestBed.inject(Router) as any;
    component.username = 'TevenV27';
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar el perfil de usuario correctamente', () => {
    fixture.detectChanges();
    expect(component.name).toBe('Steven');
    expect(component.bio).toBe('Frontend Dev');
    expect(component.email).toBe('steven@demo.com');
    expect(component.location).toBe('Cali, Colombia');
    expect(component.publicRepos).toBe(15);
    expect(component.avatar).toContain('avatars.githubusercontent.com');
  });

  it('debe mostrar la imagen por defecto si el avatar falla', () => {
    component.avatar = '';
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(component.avatar).toBe(component.avatarFallback);
  });

  it('debe mostrar mensaje de error si no se carga el perfil', () => {
    mockUser.getUserData.and.returnValue(of({}));
    component.loadUserProfile('notfound');
    fixture.detectChanges();
    expect(component.errorMsg).toBeTruthy();
    const error = fixture.nativeElement.querySelector('app-error-alert');
    expect(error).toBeTruthy();
  });

  it('debe cerrar sesión correctamente', () => {
    fixture.detectChanges();
    component.logout();
    expect(mockAuth.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debe alternar el modo oscuro', () => {
    const initial = component.isDarkMode;
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(!initial);
  });
});
