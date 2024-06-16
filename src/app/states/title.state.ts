import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import * as TitleActions from '../actions/title.action';

const initialState: {title: string} = {title: 'Age of Empires'}

// State class
@State<{title: string}>({
    name: 'title',
    defaults: initialState
})

@Injectable()
export class TitleState {
    @Selector()
    static getTitle(state: {title: string}): string {
        return state.title;
    }

    @Action(TitleActions.SetTitle)
    setTitle({ patchState }: StateContext<{title: string}>, payload: {payload: string}) {
        patchState({ title: payload.payload });
    }
}