/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import 'zone.js';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // provides HttpClient and interceptors
  ],
});