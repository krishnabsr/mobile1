import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { EmailValidator } from '@angular/forms';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  public email: any;
  public name: any;
  public itemList : Array<Object>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public database1 : DatabaseProvider) {
   this.email ='' ;
   this.name = '';
   this.itemList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  //  var email =   this.database1.retrieveEmail();
  //  console.log(email + 'contactus remail');
    
  }

  ngOnInit() {
   // this.email = this.database1.retrieveEmail();
   // this.name = this.database1.retrieveName();
  //  console.log(this.name + 'ctus2');
  // console.log(this.email + 'ctus')
    this.load();
  }
  

  public load() {
    this.database1.getEmail().then((result) => {
      this.itemList = <Array<Object>> result;
      this.email = this.itemList[0]["Email_id"];
      this.name = this.itemList[0]["name"];
      console.log(this.itemList[0]);
    },(error) =>{
      console.log("Error:" ,error);
    });
  }


}
