import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/environments/firebase.config';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const app = initializeApp(firebaseConfig);
if (typeof window !== 'undefined') {
  getAnalytics(app);
}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
