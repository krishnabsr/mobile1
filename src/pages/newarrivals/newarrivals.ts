import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the NewarrivalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newarrivals',
  templateUrl: 'newarrivals.html',
})

export class NewarrivalsPage {
  public itemList : Array<Object>;
  public studentid: any;
  images: any = [];
  imageURL: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public database1: DatabaseProvider,public http: HttpClient) {
    this.itemList = [];
    this.studentid = '';
    this.images = [];
    this.imageURL = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewarrivalsPage');
  }

  ngOnInit() {
    this.load();
  }

  public load() {
    this.database1.getEmail().then((result) => {
      // start
      this.itemList = <Array<Object>> result;
      this.studentid = this.itemList[0]["Student_id"];
      this.http.post('http://services.notnul.com/NoteService.svc/GetNewArrivals',{
        StudentID: this.studentid
      }).subscribe(res  => {
        console.log(res);
        this.images = res;
        this.images = JSON.parse(this.images);
        console.log(this.images);
        this.imageURL = this.images["Details"];
        console.log(this.imageURL[0])
      })

      // end
    })
  }

}
