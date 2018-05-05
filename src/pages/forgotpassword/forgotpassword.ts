import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ResetPage } from '../reset/reset';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  email:any;
  email_id : any;
  reset: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
   // this.email_id = this.navParams.get('email_id');
   this.reset = ResetPage;
   this.email_id = '';
   this.email = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }
  
  public forgot(email_id){
   
    this.http.post('http://services.notnul.com/UserService.svc/ResetPasswordRequest',{
      "Email": this.email_id
    })
    .subscribe(res => {
      console.log(res);
      this.resetPage();
    },err => {
      console.log('error occured');
    })
  }

  
  public resetPage() {
    this.navCtrl.push(this.reset);
  }
}

