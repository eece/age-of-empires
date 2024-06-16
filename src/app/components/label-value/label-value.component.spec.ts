import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelValueComponent } from './label-value.component';
import { By } from '@angular/platform-browser';

describe('LabelValueComponent', () => {
  let component: LabelValueComponent;
  let fixture: ComponentFixture<LabelValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and value', () => {
    component.data = {label: 'test label', value: 'test value'};
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('.label'));
    const valueElement = fixture.debugElement.query(By.css('.value'));
    expect(labelElement.nativeElement.textContent).toContain('test label');
    expect(valueElement.nativeElement.textContent).toContain('test value');
  });

});
