import { NgxsModule, Store } from "@ngxs/store";
import { DataService } from "../services/data.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, TestBed } from "@angular/core/testing";
import { UnitsTableState } from "./unitsTable.state";
import { of } from "rxjs";
import * as UnitsTableActions from '../actions/unitsTable.action';

class MockDataService {
    getData() {
        return of({
        units: [
            {
            "id": 1,
            "name": "Archer",
            "description": "Quick and light. Weak at close range; excels at battle from distance",
            "expansion": "Age of Kings",
            "age": "Feudal",
            "cost": {
                "Wood": 25,
                "Gold": 45,
            },
            "build_time": 35,
            "reload_time": 2,
            "attack_delay": 0.35,
            "movement_rate": 0.96,
            "line_of_sight": 6,
            "hit_points": 4,
            "range": 30,
            "attack": 4,
            "armor": "0/0",
            "accuracy": "80%"
            },
            {
            "id": 2,
            "name": "Crossbowman",
            "description": "Upgraded archer",
            "expansion": "Age of Kings",
            "age": "Castle",
            "cost": {
                "Wood": 25,
                "Gold": 45
            },
            "build_time": 27,
            "reload_time": 2,
            "attack_delay": 0.35,
            "movement_rate": 0.96,
            "line_of_sight": 7,
            "hit_points": 35,
            "range": 5,
            "attack": 5,
            "armor": "0/0",
            "attack_bonus": [
                "+3 spearmen"
            ],
            "accuracy": "85%"
            },
            {
            "id": 3,
            "name": "Arbalest",
            "description": "Upgraded crossbowman",
            "expansion": "Age of Kings",
            "age": "Imperial",
            "cost": {
                "Wood": 25,
                "Gold": 45
            },
            "build_time": 27,
            "reload_time": 2,
            "attack_delay": 0.35,
            "movement_rate": 0.96,
            "line_of_sight": 7,
            "hit_points": 40,
            "range": 5,
            "attack": 6,
            "armor": "0/0",
            "attack_bonus": [
                "+3 spearmen"
            ],
            "accuracy": "90%"
            },
            {
            "id": 4,
            "name": "Arbalest",
            "description": "Upgraded crossbowman",
            "expansion": "Age of Kings",
            "age": "Imperial",
            "cost": {
                "Wood": 35,
                "Food": 45
            },
            "build_time": 27,
            "reload_time": 2,
            "attack_delay": 0.35,
            "movement_rate": 0.96,
            "line_of_sight": 7,
            "hit_points": 40,
            "range": 5,
            "attack": 6,
            "armor": "0/0",
            "attack_bonus": [
                "+3 spearmen"
            ],
            "accuracy": "90%"
            }
        ]
        });
    }
}

describe('UnitsTableState', () => {
    let store: Store;
    let service: DataService;
    let httpMock: HttpTestingController;

    beforeEach(fakeAsync (() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NgxsModule.forRoot([UnitsTableState])],
            providers: [ { provide: DataService, useClass: MockDataService }]
        });
        store = TestBed.get(Store);
        service = TestBed.inject(DataService);
        httpMock = TestBed.inject(HttpTestingController);
    }));

    it('should be created', () => {
        const state = new UnitsTableState( service );
        expect(state).toBeTruthy();
    });

    it('should fetch all units data', (done) => {    
        const {payload}: UnitsTableActions.FetchUnitsData = {
          payload: {},
        };
        store.dispatch(new UnitsTableActions.FetchUnitsData(payload)).subscribe({
            next: () => {
                const state = store.selectSnapshot(UnitsTableState.filteredResults);
                expect(state.length).toBe(4);
                done();
            }
        });
    });

    it('should fetch units data with age filter', (done) => {    
        const {payload}: UnitsTableActions.FetchUnitsData = {
          payload: {age: 'Feudal'},
        };
        store.dispatch(new UnitsTableActions.FetchUnitsData(payload)).subscribe({
            next: () => {
                const state = store.selectSnapshot(UnitsTableState.filteredResults);
                expect(state.length).toBe(1);
                done();
            }
        });
    });

    it('should fetch units data with Full filter', (done) => {    
        const {payload}: UnitsTableActions.FetchUnitsData = {
          payload: {age: 'All', cost: {Wood: 0, WoodMax:30, Gold: 0,GoldMax:200, Food: 0, FoodMax:200}},
        };
        store.dispatch(new UnitsTableActions.FetchUnitsData(payload)).subscribe({
            next: () => {
                const state = store.selectSnapshot(UnitsTableState.filteredResults);
                expect(state.length).toBe(3);
                done();
            }
        });
    });
    
    it('should fetch units data with Wood filter', (done) => {    
        const {payload}: UnitsTableActions.FetchUnitsData = {
          payload: {cost: {Wood:10, WoodMax:30}},
        };
        store.dispatch(new UnitsTableActions.FetchUnitsData(payload)).subscribe({
            next: () => {
                const state = store.selectSnapshot(UnitsTableState.filteredResults);
                expect(state.length).toBe(3);
                done();
            }
        });
    });

    it('should fetch units data with Food filter', (done) => {    
        const {payload}: UnitsTableActions.FetchUnitsData = {
          payload: {cost: {Food:10, FoodMax:100}},
        };
        store.dispatch(new UnitsTableActions.FetchUnitsData(payload)).subscribe({
            next: () => {
                const state = store.selectSnapshot(UnitsTableState.filteredResults);
                expect(state.length).toBe(4);
                done();
            }
        });
    });
})