import { Component } from '@angular/core';
import { Platform, App,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { HomePage } from '../pages/home/home';
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
import { CategoriesPage } from '../pages/categories/categories';
import { NotedetailsPage } from '../pages/notedetails/notedetails';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  walletpage: any;
  aboutuspage: any;
  contactus: any;
  settings: any;
  reports: any;
  notifications: any;
  offlinelib: any;
  claim : any;
  uploads: any;
  downloads: any;
  login: any;
  home: any;
  newArrivals : any;
  categories: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public app: App,public database1 : DatabaseProvider) {
    this.walletpage = WalletPage;
    this.aboutuspage = AboutusPage;
    this.contactus = ContactusPage;
    this.settings = SettingsPage;
    this.reports = ReportsPage;
    this.notifications = NotificationsPage;
    this.offlinelib = OfflinelibPage;
    this.claim = ClaimgiftPage;
    this.uploads = MyuploadsPage;
    this.downloads = MydownloadsPage;
    this.login = LoginPage;
    this.home = HomePage;
    this.newArrivals = NewarrivalsPage;
    this.categories = CategoriesPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToWallet() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.walletpage);
  }
  goToAboutUs(){
    let nav = this.app.getRootNav();
    nav.setRoot(this.aboutuspage);
  }
  goToContactus() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.contactus);
  }
  goToSettings() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.settings);
  }
  goToReports() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.reports);
  }
  goToNotifications() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.notifications);
  }

  goToOffline() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.offlinelib);
  }

  goToClaim() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.claim);
  }

  logout() {
    this.database1.logout();
    let nav = this.app.getRootNav();
    nav.setRoot(this.login);
  }

  goToUploads() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.uploads);
  }

  goToDownloads() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.downloads);
  }

  goToHome() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.home);
  }

  goToNew() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.newArrivals);
  }

  goToCategories() {
    let nav = this.app.getRootNav();
    nav.setRoot(this.categories);
  }
  

}

