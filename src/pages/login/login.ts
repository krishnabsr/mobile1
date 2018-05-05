import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { ForgotpasswordPage } from '../../pages/forgotpassword/forgotpassword';
import { SignupPage } from '../signup/signup';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: any;
  password: any;
  homepage : any;
  forgot: any;
  formgroup: FormGroup;
  email_id: AbstractControl;
  Password: AbstractControl;
  loginArray: any = [];
  User = {};
  user :object;
  signup: any;
  response : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder : FormBuilder,public http: HttpClient,private database1 : DatabaseProvider) {
    this.email = '';
    this.signup = SignupPage;
    this.password = '';
    this.loginArray = '';
    this.user = {};
    this.response = '';
    this.homepage = HomePage;
    this.forgot = ForgotpasswordPage;
    this.formgroup = new FormGroup({
      email_id : new FormControl([Validators.required,Validators.pattern('^[\w\.=-]+@[\w\.-]+\.[\w]{2,5}$')]),
      Password: new FormControl([Validators.required])
    });
  }

  public login(Email,Password ) {
    var email_id = Email;
    var password_id = Password;
    console.log(email_id);
    console.log(password_id.length);
      if(email_id.length > 0 && password_id.length > 0 ){
        this.http.post('http://services.notnul.com/UserService.svc/AuthenticateUser2',{
        Email_Address : email_id ,
        password : password_id , 
        isEncrypted: false
      })
      .subscribe(res => {
        console.log(res);
          this.loginArray = res;
          this.loginArray = JSON.parse(this.loginArray);
          var User = {
            Email:  this.loginArray.Email,
            Name:  this.loginArray.Name,
            Token:  this.loginArray.Token,
            StudentID:  this.loginArray.StudentID
          }
          console.log(this.loginArray.Email)
          console.log(this.loginArray.Token)
          this.navigate();
          this.load(User);
        
      });
      } 
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
    this.database1.startDatabase();
  }

  ngOnInit() {
    this.database1.logout();
  }

  public navigate() {
    this.navCtrl.push(this.homepage);
  }
  public error() {
    console.log('error occured at authentication');
  }

  public forgotPage(email_id) {
    var email_id = email_id;
    this.navCtrl.push(this.forgot,{email_id});
  }

  public signupPage() {
    this.navCtrl.push(this.signup);
  }
  public load(User) {
    this.database1.InsertLoginRecord(User);
  }

}
