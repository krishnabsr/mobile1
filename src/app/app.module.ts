import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Note } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { SearchPage } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ResetPage } from '../pages/reset/reset';
import { SignupPage } from '../pages/signup/signup';
import { WalletPage } from '../pages/wallet/wallet';
import { DatabaseProvider } from '../providers/database/database';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import { SettingsPage } from '../pages/settings/settings';
import { ReportsPage } from '../pages/reports/reports';
import { NotificationsPage } from '../pages/notifications/notifications';
import { OfflinelibPage } from '../pages/offlinelib/offlinelib';
import { ClaimgiftPage } from '../pages/claimgift/claimgift';
import { MyuploadsPage } from '../pages/myuploads/myuploads';
import { MydownloadsPage } from '../pages/mydownloads/mydownloads';
import { NewarrivalsPage } from '../pages/newarrivals/newarrivals';
import { NotedetailsPage } from '../pages/notedetails/notedetails';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    LoginPage,
    ForgotpasswordPage,
    ResetPage,
    SignupPage,
    WalletPage,
    AboutusPage,
    ContactusPage,
    SettingsPage,
    ReportsPage,
    NotificationsPage,
    OfflinelibPage,
    ClaimgiftPage,
    MyuploadsPage,
    MydownloadsPage,
    NewarrivalsPage,
    NotedetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    LoginPage,
    ForgotpasswordPage,
    ResetPage,
    SignupPage,
    WalletPage,
    AboutusPage,
    ContactusPage,
    SettingsPage,
    ReportsPage,
    OfflinelibPage,
    NotificationsPage,
    ClaimgiftPage,
    MyuploadsPage,
    MydownloadsPage,
    NewarrivalsPage,
    NotedetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
