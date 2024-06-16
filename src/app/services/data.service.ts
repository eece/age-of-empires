import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitTableItem } from '../models/units.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'assets/data/units.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<{units: any[]}> {
    return this.http.get<any>(this.dataUrl);
  }

  getTableData(data:any[]): UnitTableItem[] {
    return data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        age: item.age,
        cost: item.cost,
      };
    });
  }

}