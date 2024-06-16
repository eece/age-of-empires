import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { UnitsPageComponent } from './components/pages/units-page/untis-page.component';
import { UnitDetailPageComponent } from './components/pages/unit-detail-page/unit-detail-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'units', component: UnitsPageComponent },
    { path: 'unit/:id', component: UnitDetailPageComponent },
];
