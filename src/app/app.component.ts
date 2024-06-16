import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { TitleState } from './states/title.state';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AudioPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'age-of-empires';

  constructor(private store: Store, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { 
     this.store.select(TitleState.getTitle).subscribe((title) => {
      this.title = title
      this.cdr.detectChanges();
    });
  }
}
