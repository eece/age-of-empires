import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {
  @Input() audioSrc:string = 'assets/audio/intro.mp3';

  audio = new Audio();
  isPlaying = false;

  constructor() {
    this.audio.src = this.audioSrc;
    this.audio.load();
  }

  toggleAudio() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }
}
