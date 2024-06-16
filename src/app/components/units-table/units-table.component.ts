import { Component, Input } from '@angular/core';
import { CostI, UnitTableItem } from '../../models/units.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-units-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './units-table.component.html',
  styleUrl: './units-table.component.scss'
})
export class UnitsTableComponent {
  @Input() data: UnitTableItem[] = [];

  constructor(private router: Router) { }
  getFormattedCost(cost?: CostI | null) {
    if(!cost) return 'Free';
    const costString: string[] = [];
    if (cost.Wood) costString.push(`Wood: ${cost.Wood}`);
    if (cost.Food) costString.push(`Food: ${cost.Food}`);
    if (cost.Gold) costString.push(`Gold: ${cost.Gold}`);
    return costString.join(', ');
  }


  openUnitDetail(id: number) {
    this.router.navigate(['/unit', id]);
  }
}
