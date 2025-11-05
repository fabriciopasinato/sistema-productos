import { mergeApplicationConfig, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),

    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
