import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the NotedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notedetails',
  templateUrl: 'notedetails.html',
})
export class NotedetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public database1: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotedetailsPage');
  }

}
