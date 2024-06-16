import { FilterUnitsI } from "../models/units.model";

export class FetchUnitsData {
    static readonly type = '[UnitsTable] Fetch Units Data';
    constructor(public payload: FilterUnitsI) {}
}