import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UnitDetailItem } from "../models/units.model";
import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import * as UnitsDetailActions from '../actions/unitDetail.action';
import { tap } from "rxjs";

  export interface UnitDetailStateModel {
    unitDetailData: UnitDetailItem;
  }
  const initialState: UnitDetailStateModel = {
    unitDetailData:{}
  };

  @State<UnitDetailStateModel>({
    name: 'unitDetail',
    defaults: initialState
  })
  @Injectable()
  export class UnitDetailState {
      constructor(private dataService: DataService) {}

      // Selector for unit detail
      @Selector()
      static unitDetailData(state: UnitDetailStateModel) {
          return state.unitDetailData;
      }

      @Action(UnitsDetailActions.FetchUnitDataById)
      fetchUnitDataById({ patchState }: StateContext<UnitDetailStateModel>, { payload }: UnitsDetailActions.FetchUnitDataById) {
        return this.dataService.getData().pipe(
          tap(results => {
            const unitData = results.units.find(item => item.id === payload.id);
            if (unitData) {
              const unitDetailData: UnitDetailItem = {
                id: unitData.id,
                name: unitData.name,
                description: unitData.description,
                age: unitData.age,
                woodCost: unitData.cost?.Wood,
                foodCost: unitData.cost?.Food,
                goldCost: unitData.cost?.Gold,
                buildTime: unitData.build_time,
                reloadTime: unitData.reload_time,
                hitPoints: unitData.hit_points,
                attack: unitData.attack,
                accuracy: unitData.accuracy,
              };
              patchState({ unitDetailData });
            }
          })
        );
      }
  }