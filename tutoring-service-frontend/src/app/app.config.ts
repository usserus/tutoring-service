import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {routes} from './app.routes';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {provideIcons} from '@ng-icons/core';
import {
  heroMapPin,
  heroUser,
  heroCurrencyEuro,
  heroSquare3Stack3d,
  heroClipboardDocumentList,
  heroCalendarDays,
  heroAdjustmentsHorizontal,
  heroXMark,
  heroCog6Tooth
} from '@ng-icons/heroicons/outline';

registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    {provide: LOCALE_ID, useValue: 'de'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    provideIcons({
      heroMapPin,
      heroUser,
      heroCurrencyEuro,
      heroCalendarDays,
      heroSquare3Stack3d,
      heroClipboardDocumentList,
      heroAdjustmentsHorizontal,
      heroXMark,
      heroCog6Tooth
    })
  ],
};
