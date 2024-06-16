import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
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
  isNavOpen = false;

  constructor(private store: Store, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { 
     this.store.select(TitleState.getTitle).subscribe((title) => {
      this.title = title
      this.cdr.detectChanges();
    });
  }

  @HostListener('document:click', ['$event'])
  onBodyClick(event: Event): void {
    const target = event.target as HTMLElement;
    const isNavbarToggler = target.classList.contains('navbar-toggler') || target.classList.contains('nav-link');
    const isNavbarCollapseShown = this.isNavOpen;

    if (isNavbarToggler && isNavbarCollapseShown) {
      this.toggleNav();
    }
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}
