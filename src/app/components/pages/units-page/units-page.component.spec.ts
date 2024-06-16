import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UnitsPageComponent } from './untis-page.component';
import { NgxsModule, Store } from '@ngxs/store';
import { FormBuilder } from '@angular/forms';
import {  switchMap, tap } from 'rxjs';
import { UnitsTableState } from '../../../states/unitsTable.state';
import * as UnitsTableActions from '../../../actions/unitsTable.action';


describe('UnitsPageComponent', () => {
  let component: UnitsPageComponent;
  let fixture: ComponentFixture<UnitsPageComponent>;
  let formBuilder: FormBuilder;
  enum CostType {
    Wood = 'Wood',
    Food = 'Food',
    Gold = 'Gold',
  }
  let store: Store;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsPageComponent, [NgxsModule.forRoot([UnitsTableState])], RouterTestingModule, HttpClientTestingModule],
      providers: [Store , FormBuilder],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitsPageComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.filterForm = formBuilder.group({
      age: ['All'],
      cost: formBuilder.group({
        Wood: {value: 200, disabled: true},
        Food: {value: 200, disabled: true},
        Gold: {value: 200, disabled: true},
      })
    });
    fixture.detectChanges();
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should enable cost control when checkbox is checked', () => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    const event = new Event('change');
    Object.defineProperty(event, 'target', { writable: false, value: checkbox });
    (event.target as HTMLInputElement).checked = true;
    component.changeCostCheckbox(event, CostType.Wood, 0);
    expect(component?.getOptions(CostType.Wood)?.disabled).toBeFalse();
  });

  it('should disable cost control when checkbox is unchecked', () => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    const event = new Event('change');
    Object.defineProperty(event, 'target', { writable: false, value: checkbox });
    (event.target as HTMLInputElement).checked = false;
    component.changeCostCheckbox(event, CostType.Wood, 0);
    expect(component?.getOptions(CostType.Wood)?.disabled).toBeTrue();
  });

  it('should set value of age control to "All"', () => {
    component.filterByAge('All'); 
    expect(component.filterForm.value.age).toEqual('All');
  })

  /**
   * Unit test for getCost function.
   */
  it('should return the cost value for a given cost type', () => {
    const costType = CostType.Wood;
    const expectedCost = 100;
    component.filterForm.controls['cost'].setValue({ Wood: {value: expectedCost}, Food: '', Gold: '' });
    const result = component.getCostMin(costType);
    expect(result).toEqual(expectedCost?.toString());
  });

  it('should return the cost value for a given cost type', () => {
    const costType = CostType.Wood;
    const expectedCost = '0';
    component.filterForm.controls['cost'].setValue({ Wood: expectedCost, Food: '', Gold: '' });
    const result = component.getCostMin(costType)?.toString();
    expect(result).toEqual(expectedCost);
  });

  /**
   * Unit test for getCost function.
   */
  it('should return the maximum value for a given cost type if the value is not defined', () => {
    const costType = CostType.Wood;
    const maxValue = 200;
    const result = component.getCostMax(costType);
    expect(result.toString()).toEqual(maxValue.toString());
  });

  it('should dispatch the FetchUnitsData action when filterForm value changes', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const subscription = component.filterForm.valueChanges.pipe(
      tap(value => {
        store.dispatch(new UnitsTableActions.FetchUnitsData({ age: value.age }));
      })
    ).subscribe();
    component.filterForm.patchValue({ age: 'Dark' });
  
    tick(); 
  
    store.select(UnitsTableState.filteredResults).subscribe((data) => {
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(new UnitsTableActions.FetchUnitsData({ age: 'Dark' }));
      expect(component.unitsTableData).toEqual(data);
    });
  
    subscription.unsubscribe();
  }));
  
});