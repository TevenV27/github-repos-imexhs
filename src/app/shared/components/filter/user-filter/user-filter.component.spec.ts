import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFilterComponent } from './user-filter.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('UserFilterComponent', () => {
  let component: UserFilterComponent;
  let fixture: ComponentFixture<UserFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFilterComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe emitir el evento search al presionar Enter', () => {
    spyOn(component.search, 'emit');
    component.username = 'TevenV27';
    fixture.detectChanges();

    // Simula el keydown.enter
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    input.dispatchEvent(event);
    component.onSubmit();
    expect(component.search.emit).toHaveBeenCalledWith('TevenV27');
  });

  it('debe emitir clearError al cambiar el input', () => {
    spyOn(component.clearError, 'emit');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'nuevo';
    input.dispatchEvent(new Event('input'));
    component.onInputChange();
    expect(component.clearError.emit).toHaveBeenCalled();
  });

  it('debe mostrar el mensaje de error si error está definido', () => {
    component.error = 'El usuario no existe';
    fixture.detectChanges();
    const errorDiv = fixture.debugElement.query(By.css('.text-red-500'));
    expect(errorDiv.nativeElement.textContent).toContain('El usuario no existe');
  });

  it('no debe mostrar el mensaje de error si error está vacío', () => {
    component.error = '';
    fixture.detectChanges();
    const errorDiv = fixture.debugElement.query(By.css('.text-red-500'));
    expect(errorDiv).toBeFalsy();
  });
});
