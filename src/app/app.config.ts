import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { UnitsTableState } from './states/unitsTable.state';
import { TitleState } from './states/title.state';
import { UnitDetailState } from './states/unitDetail.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    importProvidersFrom(
      NgxsModule.forRoot(
        [UnitsTableState, TitleState, UnitDetailState],
      ),
    )
  ],
};
