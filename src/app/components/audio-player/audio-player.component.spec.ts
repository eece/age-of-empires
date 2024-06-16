import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { AudioPlayerComponent } from './audio-player.component';
import { By } from '@angular/platform-browser';
import { debounceTime } from 'rxjs';

describe('AudioPlayerComponent', () => {
  let component: AudioPlayerComponent;
  let fixture: ComponentFixture<AudioPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should play audio on button click', fakeAsync(() => {
    const audioElement = component.audio;
    spyOn(audioElement, 'play');
    const button = fixture.debugElement.query(By.css('.audio-player button')).nativeElement;
    button.click();
    expect(audioElement.play).toHaveBeenCalled();
  }));

  it('should stop audio on button click when playing', fakeAsync(() => {
    const audioElement = component.audio;
    spyOn(audioElement, 'play');
    spyOn(audioElement, 'pause');
    const button = fixture.debugElement.query(By.css('.audio-player button')).nativeElement;
    button.click();
    button.click();
    expect(audioElement.pause).toHaveBeenCalled();
  }));
});
