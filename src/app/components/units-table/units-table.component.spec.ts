import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsTableComponent } from './units-table.component';
import { NgxsModule } from '@ngxs/store';

describe('UnitsTableComponent', () => {
  let component: UnitsTableComponent;
  let fixture: ComponentFixture<UnitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  // Tests for getFormattedCost function
  describe('getFormattedCost', () => {
    it('should return "Free" when cost is falsy', () => {
      expect(component.getFormattedCost(null)).toBe('Free');
    });

    it('should return "Wood: 100, Food: 50, Gold: 20" when cost is {Wood: 100, Food: 50, Gold: 20}', () => {
      expect(component.getFormattedCost({Wood: 100, Food: 50, Gold: 20})).toBe('Wood: 100, Food: 50, Gold: 20');
    });

    it('should return "Food: 50, Gold: 20" when cost is {Food: 50, Gold: 20, Wood: null}', () => {
      expect(component.getFormattedCost({Food: 50, Gold: 20, Wood: null})).toBe('Food: 50, Gold: 20');
    });

    it('should return "Gold: 20" when cost is {Food: undefined, Gold: 20, Wood: undefined}', () => {
      expect(component.getFormattedCost({Food: undefined, Gold: 20, Wood: undefined})).toBe('Gold: 20');
    });

    it('should navigate to unit detail', () => {
      const navigateSpy = spyOn((component as any).router, 'navigate');
      component.openUnitDetail(1);
      expect(navigateSpy).toHaveBeenCalledWith(['/unit', 1]);
    });
  });

});
