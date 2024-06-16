import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CostI, UnitTableItem } from '../../../models/units.model';
import { Store } from '@ngxs/store';
import { FetchUnitsData } from '../../../actions/unitsTable.action';
import { switchMap, tap } from 'rxjs';
import { UnitsTableState } from '../../../states/unitsTable.state';
import { SetTitle } from '../../../actions/title.action';
import { Router } from '@angular/router';
import { UnitsTableComponent } from '../../units-table/units-table.component';
enum CostType {
  Wood = 'Wood',
  Food = 'Food',
  Gold = 'Gold',
}
@Component({
  selector: 'app-units-page',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule, FormsModule, UnitsTableComponent],
  templateUrl: './units-page.component.html',
  styleUrl: './units-page.component.scss',
  providers:[Store],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UnitsPageComponent implements OnInit {
  
  ages = ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'];
  costTypes = [
    {
      name: CostType.Wood,
      nameCheck: 'WoodCheck',
      min: 0,
      max: 200,
    },
    {
      name: CostType.Food,
      nameCheck: 'FoodCheck',
      min: 0,
      max: 200,
    },
    {
      name: CostType.Gold,
      nameCheck: 'GoldCheck',
      min: 0,
      max: 200,
    }
  ];
  filterForm: FormGroup = new FormGroup({});
  unitsTableData: UnitTableItem[] = [];
  constructor(private fb: FormBuilder, private store: Store, private cdr: ChangeDetectorRef, private router: Router) {
    this.filterForm = this.fb.group({
      age: ['All'],
      cost: this.fb.group({
       Wood: {value: this.getMaxValueByCostType(CostType.Wood), disabled: true},
       Food: {value: this.getMaxValueByCostType(CostType.Food), disabled: true},
       Gold: {value: this.getMaxValueByCostType(CostType.Gold), disabled: true},
      })
   });
  }

  ngOnInit(): void {
    
   this.filterForm.valueChanges.pipe(
     switchMap((value) => this.store.dispatch(
       new FetchUnitsData({age: value.age, cost: value.cost})
     ).pipe(
       tap(() => {
         this.unitsTableData = this.store.selectSnapshot(UnitsTableState.filteredResults);
         this.cdr.detectChanges();
       })
     )
    )
   ).subscribe();

    this.store.dispatch([
      new SetTitle('Units Page'),
      new FetchUnitsData({})]).pipe(
      tap(() => {
        this.unitsTableData = this.store.selectSnapshot(UnitsTableState.filteredResults);
        this.cdr.detectChanges();
      })
    ).subscribe();
  }


  filterByAge(age: string) {
    this.filterForm.controls['age'].setValue(age);
  }


  getCost(costType: CostType):string {
    return  this.filterForm.controls['cost'].value?.[costType]?.toString() || this.getMaxValueByCostType(costType)?.toString();
  }

  changeCostCheckbox(event: Event, costType: CostType) {
    if((event.target as HTMLInputElement).checked) {
      this.filterForm.controls['cost'].get(costType)?.enable();
    } else {
      this.filterForm.controls['cost'].get(costType)?.setValue(this.getMaxValueByCostType(costType));
      this.filterForm.controls['cost'].get(costType)?.disable();
    }
  }

  getMaxValueByCostType(costType: CostType | string): number {
    return this.costTypes.find((item) => item.name === costType)?.max || 0;
  }
  
}
