import { fakeAsync, TestBed } from "@angular/core/testing";
import { DataService } from "../services/data.service";
import { UnitDetailState } from "./unitDetail.state";
import { NgxsModule, Store } from "@ngxs/store";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import * as UnitsDetailActions from '../actions/unitDetail.action';
import { of } from "rxjs";

class MockDataService {
    getData() {
      return of({
        units: [
          { id: 1, name: 'Unit 1' },
          { id: 2, name: 'Unit 2' }
        ]
      });
    }
  }

describe('UnitDetailState', () => {
    let store: Store;
    let service: DataService;
    let httpMock: HttpTestingController;
    beforeEach(fakeAsync (() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NgxsModule.forRoot([UnitDetailState])],
            providers: [ { provide: DataService, useClass: MockDataService }]
        });
        store = TestBed.get(Store);
        service = TestBed.inject(DataService);
        httpMock = TestBed.inject(HttpTestingController);
    }));

    it('should be created', () => {
        const state = new UnitDetailState( service );
        expect(state).toBeTruthy();
    });

    it('should fetch unit data by id', (done) => {    
        const id = 1;
        const payload: UnitsDetailActions.FetchUnitDataById = {
          payload: { id },
        };
        store.dispatch(new UnitsDetailActions.FetchUnitDataById(payload.payload)).subscribe({
          next: () => {    
            const state = store.selectSnapshot(UnitDetailState.unitDetailData);
            expect(state.id).toBe(id);
            done();
          },
          error: (err) => {
            done.fail(err);
          }
        });
    });
});
