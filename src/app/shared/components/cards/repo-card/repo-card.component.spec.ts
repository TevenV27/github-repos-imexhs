import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoCardComponent } from './repo-card.component';
import { RepoModel } from '../../../models/repo.model';

describe('RepoCardComponent', () => {
  let component: RepoCardComponent;
  let fixture: ComponentFixture<RepoCardComponent>;

  const mockRepo: RepoModel = {
    id: 123,
    name: 'demo-repo',
    full_name: 'TevenV27/demo-repo',
    private: false,
    stargazers_count: 42,
    forks_count: 13,
    language: 'TypeScript',
    html_url: 'https://github.com/TevenV27/demo-repo',
    description: 'Repositorio demo para test',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoCardComponent);
    component = fixture.componentInstance;
    component.repo = { ...mockRepo };
    component.languageColors = { TypeScript: '#3178c6' };
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el nombre y descripción del repo', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(mockRepo.name);
    expect(compiled.textContent).toContain(mockRepo.description);
  });

  it('debería mostrar la cantidad de estrellas', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(mockRepo.stargazers_count.toString());
  });

  it('debería mostrar el badge del lenguaje si hay lenguaje', () => {
    const lang = fixture.nativeElement.querySelector('.font-semibold.bg-gray-100');
    expect(lang.textContent).toContain('TypeScript');
  });

  it('debería poner el color correcto al circulito de lenguaje', () => {
    fixture.detectChanges();
    const circle = fixture.nativeElement.querySelector('.w-3.h-3.rounded-full');
    // El color puede variar como rgb o hex. Aquí verificamos ambos.
    const color = circle.style.background;
    // Hex a RGB conversion: #3178c6 -> rgb(49, 120, 198)
    expect(color === 'rgb(49, 120, 198)' || color === '#3178c6').toBeTrue();
  });

  it('debería mostrar "Privado" si el repo es privado', () => {
    component.repo.private = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Privado');
  });

  it('el link debe llevar a la página del repo', () => {
    const link = fixture.nativeElement.querySelector('a.text-xl');
    expect(link.getAttribute('href')).toBe(mockRepo.html_url);
  });

  it('si la descripción está vacía muestra "Sin descripción"', () => {
    component.repo.description = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sin descripción');
  });

  it('si language es null no muestra el badge', () => {
    component.repo.language = null;
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.font-semibold.bg-gray-100');
    expect(badge).toBeNull();
  });

  it('debe mostrar id correcto', () => {
    expect(component.repo.id).toBe(123);
  });
});
