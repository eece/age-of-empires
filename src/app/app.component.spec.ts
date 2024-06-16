import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { debounceTime, of } from 'rxjs';
describe('AppComponent', () => {
  let store: Store;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, [NgxsModule.forRoot([])], RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the age-of-empires title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    debounceTime(1000);
    expect(app.title).toEqual('age-of-empires');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(store, 'select').and.returnValue(of('Age Of Empires 2'));
    app.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.main-title')?.textContent).toContain('Age Of Empires 2');
  });

  it('should toggle nav', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.toggleNav();
    expect(app.isNavOpen).toBeTrue();
  });

  // Unit tests for the 'onBodyClick' function


  it('should toggleNav when navbar-collapse is shown', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.toggleNav();
    expect(app.isNavOpen).toBeTrue();
  });

  it('should not toggleNav when other elements are clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const targetElement = fixture.nativeElement.querySelector('.navbar-collapse');
    targetElement.click(); // Trigger the click event on the navbar-collapse element
    fixture.detectChanges();
    expect(app.isNavOpen).toBeFalse();
  });

});
