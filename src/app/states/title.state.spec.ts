import { TestBed } from "@angular/core/testing";
import { TitleState } from "./title.state";
import { NgxsModule, Store } from "@ngxs/store";
import * as TitleActions from '../actions/title.action';
 
describe('TitleState', () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([TitleState])]
        });
        store = TestBed.get(Store);
    });

    it('should set title', () => {
        store.dispatch(new TitleActions.SetTitle('test'));
        let title: string;
        store.select(TitleState.getTitle).subscribe(state => {
            title = state;
            expect(title).toEqual('test');
        });
    });
});
