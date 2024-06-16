import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetTitle } from '../../../actions/title.action';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  constructor(private store: Store) { }
  ngOnInit(): void { 
    this.store.dispatch(new SetTitle('Home'));
  }
}
