import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the OfflinelibPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offlinelib',
  templateUrl: 'offlinelib.html',
})
export class OfflinelibPage {
  public itemList : Array<Object>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public database1: DatabaseProvider) {
    this.itemList = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinelibPage');
    this.load();
  }


  public load() {
    this.database1.getDownload().then((result) => {
      this.itemList = <Array<Object>> result;
      console.log(this.itemList[0])
    })
  }

}
