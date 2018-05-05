import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
  email: any;
  password: any;
  reset: any;
  login:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
    this.email = '';
    this.password = '';
    this.reset = '';
    this.login = LoginPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

  public resetPassword(email,password,reset) {
    this.http.post('http://services.notnul.com/UserService.svc/ResetPasswordWithCode',{
      Email: email,
      ResetPassWordCode : reset,
      NewPassword : password
    })
    .subscribe(res => {
      console.log(res);
    })
  }

  public backtologin() {
    this.navCtrl.push(this.login);
  }
}
