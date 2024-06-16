import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UnitDetailPageComponent } from './unit-detail-page.component';
import { NgxsModule } from '@ngxs/store';

describe('UnitDetailPageComponent', () => {
  let component: UnitDetailPageComponent;
  let fixture: ComponentFixture<UnitDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitDetailPageComponent, NgxsModule.forRoot([]), RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
