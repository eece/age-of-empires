import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetTitle } from '../../../actions/title.action';
import { CommonModule } from '@angular/common';
import { UnitDetailItem } from '../../../models/units.model';
import { ActivatedRoute } from '@angular/router';
import { UnitDetailState } from '../../../states/unitDetail.state';
import { FetchUnitDataById } from '../../../actions/unitDetail.action';
import { LabelValueComponent } from '../../label-value/label-value.component';
@Component({
  selector: 'app-unit-detail-page',
  standalone: true,
  imports: [CommonModule, LabelValueComponent],
  templateUrl: './unit-detail-page.component.html',
  styleUrl: './unit-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitDetailPageComponent implements OnInit {
  unitInfo: UnitDetailItem = {};
  unitInfoArray: {label:string, value:any}[] = [];
  constructor(private store: Store, private cdr: ChangeDetectorRef,  private route: ActivatedRoute) { }

  ngOnInit(): void { 
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new SetTitle('Unit Detail'));
    this.store.dispatch(new FetchUnitDataById({id:Number(id)})).subscribe(()=>
      {
        this.unitInfo = this.store.selectSnapshot(UnitDetailState.unitDetailData);
        this.mapDataToUnitInfoArray();
      }
    );
  } 
  mapDataToUnitInfoArray() {
    this.unitInfoArray = [
      {label: 'ID', value: this.unitInfo.id},
      {label: 'Name', value: this.unitInfo.name},
      {label: 'Description', value: this.unitInfo.description},
      {label: 'Age', value: this.unitInfo.age},
      {label: 'Wood Cost', value: this.unitInfo.woodCost},
      {label: 'Food Cost', value: this.unitInfo.foodCost},
      {label: 'Gold Cost', value: this.unitInfo.goldCost},
      {label: 'Build Time', value: this.unitInfo.buildTime},
      {label: 'Reload Time', value: this.unitInfo.reloadTime},
      {label: 'Hit Points', value: this.unitInfo.hitPoints},
      {label: 'Attack', value: this.unitInfo.attack},
      {label: 'Accuracy', value: this.unitInfo.accuracy},
    ];
    this.cdr.detectChanges();
  }
}
