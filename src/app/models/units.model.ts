export interface UnitTableItem {
    id: number;
    name: string;
    age: string;
    cost: CostI;
}

export interface FilterTableItems {
    name: string;
    age: string;
    cost: CostI;
}

export interface FilterUnitsI{
  age?: string;
  cost?: CostI;
  id?: number;
}

export type CostI = Partial<{
    Wood:number | null,
    Food:number | null,
    Gold?: number | null
    WoodMax:number | null,
    FoodMax:number | null,
    GoldMax?: number | null
}>

export type UnitDetailItem = Partial<{
    id: number;
    name: string;
    description: string;
    age: string;
    woodCost: number;
    foodCost: number;
    goldCost: number;
    buildTime: number;
    reloadTime: number;
    hitPoints: number;
    attack: number;
    accuracy: number;
}>