import { FilterUnitsI } from "../models/units.model";

export class FetchUnitDataById {
    static readonly type = '[UnitsTable] Fetch Unit Data By Id';
    constructor(public payload: FilterUnitsI) {}
}