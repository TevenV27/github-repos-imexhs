import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      loginWithGitHub: jasmine.createSpy('loginWithGitHub'),
      getGitHubUsername: jasmine.createSpy('getGitHubUsername')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, CommonModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('login navega al usuario si todo está bien', () => {
    mockAuthService.loginWithGitHub.and.returnValue(of({}));
    mockAuthService.getGitHubUsername.and.returnValue('steven');

    component.login();

    expect(mockAuthService.loginWithGitHub).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user', 'steven']);
  });

  it('login alerta si no puede obtener username', () => {
    spyOn(window, 'alert');
    mockAuthService.loginWithGitHub.and.returnValue(of({}));
    mockAuthService.getGitHubUsername.and.returnValue(undefined);

    component.login();

    expect(window.alert).toHaveBeenCalledWith('No se pudo obtener el usuario de GitHub. Intenta de nuevo.');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('login muestra error si el login falla', () => {
    spyOn(window, 'alert');
    mockAuthService.loginWithGitHub.and.returnValue(throwError(() => ({ message: 'Error de prueba' })));

    component.login();

    expect(window.alert).toHaveBeenCalledWith('Error al iniciar sesión: Error de prueba');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
