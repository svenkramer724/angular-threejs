import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

declare module 'three';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
