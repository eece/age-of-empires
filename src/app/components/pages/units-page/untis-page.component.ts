import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitTableItem } from '../../../models/units.model';
import { Store } from '@ngxs/store';
import { FetchUnitsData } from '../../../actions/unitsTable.action';
import { switchMap, tap } from 'rxjs';
import { UnitsTableState } from '../../../states/unitsTable.state';
import { SetTitle } from '../../../actions/title.action';
import { Router } from '@angular/router';
import { UnitsTableComponent } from '../../units-table/units-table.component';
import { Options, NgxSliderModule, ChangeContext  } from '@angular-slider/ngx-slider';

enum CostType {
  Wood = 'Wood',
  Food = 'Food',
  Gold = 'Gold',
}
@Component({
  selector: 'app-units-page',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule, FormsModule, UnitsTableComponent, NgxSliderModule],
  templateUrl: './units-page.component.html',
  styleUrl: './units-page.component.scss',
  providers:[Store],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UnitsPageComponent implements OnInit {
  costMinValue: number = 0;
  costMaxValue: number = 200;
  ages = ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'];
  costTypes = [
    {
      name: CostType.Wood,
      nameCheck: 'WoodCheck',
      min: this.costMinValue,
      max: this.costMaxValue,
    },
    {
      name: CostType.Food,
      nameCheck: 'FoodCheck',
      min: this.costMinValue,
      max: this.costMaxValue,
    },
    {
      name: CostType.Gold,
      nameCheck: 'GoldCheck',
      min: this.costMinValue,
      max: this.costMaxValue,
    }
  ];
  filterForm: FormGroup = new FormGroup({});
  unitsTableData: UnitTableItem[] = [];


  options: {costType:CostType, options:Options}[] = [
      {
        costType: CostType.Wood,
        options:{
          floor: this.costMinValue,
          ceil: this.costMaxValue,
          disabled:true
        }
      },
      {
        costType: CostType.Food,
        options:{
          floor: this.costMinValue,
          ceil: this.costMaxValue,
          disabled:true
        }
      },
      {
        costType: CostType.Gold,
        options:{
          floor: this.costMinValue,
          ceil: this.costMaxValue,
          disabled:true
        }
      }
    ];
  constructor(private fb: FormBuilder, private store: Store, private cdr: ChangeDetectorRef, private router: Router) {
    this.filterForm = this.fb.group({
      age: ['All'],
      cost: this.fb.group({
       Wood: {value: this.costMinValue},
       WoodMax: {value: this.costMaxValue},
       Food: {value: this.costMinValue},
       FoodMax: {value: this.costMaxValue},
       Gold: {value: this.costMinValue},
       GoldMax: {value: this.costMaxValue},
      })
   });
  }

  ngOnInit(): void {
    
   this.filterForm.valueChanges.pipe(
     switchMap((value) => this.store.dispatch(
       new FetchUnitsData({age: value.age, cost: {
         Wood: value?.cost?.Wood?.value,
         WoodMax: value?.cost?.WoodMax?.value,
         Food: value?.cost?.Food?.value,
         FoodMax: value?.cost?.FoodMax?.value,
         Gold: value?.cost?.Gold?.value,
         GoldMax: value?.cost?.GoldMax?.value
        }})
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


  getCostMin(costType: CostType):string {
    return  this.filterForm.controls['cost'].value?.[costType]?.value?.toString() || this.costMinValue;
  }

  getCostMax(costType: CostType):string {
    return  this.filterForm.controls['cost'].value?.[`${costType}Max`]?.value?.toString() || this.costMaxValue;
  }

  changeCostCheckbox(event: Event, costType: CostType, index:number) {
    const checked = (event.target as HTMLInputElement).checked;
    const option = this.options.find((item) => item.costType === costType);    
    if (option) {
      option.options = { ...option.options, disabled: !checked };
      if (!checked) {
        this.filterForm.controls['cost'].get(costType)?.setValue({ value:this.costMinValue});
        this.filterForm.controls['cost'].get(`${costType}Max`)?.setValue({ value:this.costMaxValue});
      }
      this.cdr.detectChanges();
    }
  }

  onUserChangeEnd(changeContext: ChangeContext, costType: CostType | string): void {
    this.filterForm.controls['cost'].get(costType)?.setValue({ value: changeContext.value});
    this.filterForm.controls['cost'].get(`${costType}Max`)?.setValue({ value:changeContext.highValue});
    this.cdr.detectChanges();
  }

  getOptions(costType: CostType): Options {
    return this.options.find((item) => item.costType === costType)?.options || {}
  }
}
