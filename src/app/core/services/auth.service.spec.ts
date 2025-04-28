import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
// Importa el tipo Auth si lo usas, o simplemente usa el string 'Auth'
import { Auth } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: {} }, // MOCKEA el provider Auth aquí
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});