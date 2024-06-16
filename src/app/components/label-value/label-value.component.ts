import { Component, Input } from '@angular/core';
import { LabelValueI } from '../../models/generic.model';

@Component({
  selector: 'app-label-value',
  standalone: true,
  imports: [],
  templateUrl: './label-value.component.html',
  styleUrl: './label-value.component.scss'
})

export class LabelValueComponent {
  @Input() data : LabelValueI = {label: '', value: ''}
}
