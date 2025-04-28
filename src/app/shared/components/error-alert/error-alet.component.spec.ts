import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorAlertComponent } from './error-alert.component';
import { By } from '@angular/platform-browser';

describe('ErrorAlertComponent', () => {
  let component: ErrorAlertComponent;
  let fixture: ComponentFixture<ErrorAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorAlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorAlertComponent);
    component = fixture.componentInstance;
  });

  it('debería mostrar el mensaje de error', () => {
    component.message = 'Esto es un error';
    fixture.detectChanges();
    const msg = fixture.nativeElement.querySelector('span');
    expect(msg.textContent).toContain('Esto es un error');
  });

  it('debería emitir el evento close al hacer click en el botón', () => {
    spyOn(component.close, 'emit');
    component.message = 'Error test';
    fixture.detectChanges();

    const closeBtn = fixture.debugElement.query(By.css('button'));
    closeBtn.nativeElement.click();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('no debería mostrarse si show es false', () => {
    component.message = 'Un error';
    component.show = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Un error');
  });
});
