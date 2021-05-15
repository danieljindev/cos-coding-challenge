import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

// Additionals packages
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { LoginComponent } from './components/login/login.component';

// Material design modules
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { BaseComponent } from './components/base/base.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

const appRoutes: Routes = [{ path: '**', component: AppComponent }];

registerLocaleData(fr, 'fr');

// Retrieve access token
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export function jwtOptionsFactory() {
  return {
    tokenGetter,
    whitelistedDomains: ['example.com'],
    blacklistedRoutes: ['example.com/examplebadroute/']
  };
}

@NgModule({
  declarations: [AppComponent, LoginComponent, BaseComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    CookieModule.forRoot(),
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
