import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UnitDetailItem, UnitTableItem } from '../models/units.model';
import * as UnitsTableActions from '../actions/unitsTable.action';
import { DataService } from '../services/data.service';

// State model
export interface UnitsTableStateModel {
  filteredResults: UnitTableItem[];
  allUnits: UnitTableItem[];
  unitDetailData: UnitDetailItem;
}

// Initial state
const initialState: UnitsTableStateModel = {
  filteredResults: [],
  allUnits: [],
  unitDetailData:{}
};

// State class
@State<UnitsTableStateModel>({
  name: 'results',
  defaults: initialState
})
@Injectable()
export class UnitsTableState {

  constructor(private dataService: DataService) {}

  // Selector for filtered results
  @Selector()
  static filteredResults(state: UnitsTableStateModel) {
    return state.filteredResults;
  }

  // Action to fetch data from remote server
  @Action(UnitsTableActions.FetchUnitsData)
  fetchUnitsData({ patchState }: StateContext<UnitsTableStateModel>, { payload }: UnitsTableActions.FetchUnitsData) {
    return this.dataService.getData().pipe(
      tap(results => {
        let tempFilteredResults :UnitTableItem[] = results.units;
        if(payload.age && payload.age !== 'All'){
            tempFilteredResults = tempFilteredResults.filter((item) => item.age === payload.age);
        }
        if(payload?.cost){
            if(payload?.cost?.Wood){
                tempFilteredResults = tempFilteredResults?.filter((item) => 
                    !item.cost?.Wood || (item.cost?.Wood <= (payload?.cost?.Wood || 0))          
                ); 
            }
            if(payload?.cost?.Food){
                tempFilteredResults = tempFilteredResults?.filter((item) => 
                    !item.cost?.Food || (item.cost?.Food <= (payload?.cost?.Food || 0))           
                ); 
            }
            if(payload?.cost?.Gold){
                tempFilteredResults = tempFilteredResults?.filter((item) => 
                    !item.cost?.Gold || (item.cost?.Gold <= (payload?.cost?.Gold || 0))          
                ); 
            }
        }
        patchState({ filteredResults: tempFilteredResults });
      })
    );
  }
}