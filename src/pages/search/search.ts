import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { NotedetailsPage } from '../notedetails/notedetails';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public itemList : Array<Object>;
  notedetails: any;
  public SearchString:any;
  public isAuthor:boolean;
  public StudentID:any;
  search:any = [];
  searchURL: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HttpClient,public database1: DatabaseProvider) {
   this.SearchString = this.navParams.get('FullName');
   this.isAuthor= true;
   this.StudentID = '';
   this.search = '';
   this.searchURL = '';
   this.notedetails = NotedetailsPage;

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  gotoNoteDetails(Noteid: string) {
    this.navCtrl.push(NotedetailsPage,{Noteid})
  }
  gotoSearch(){
    this.navCtrl.push(SearchPage,{isAuthor:false});
  }

  ngOnInit(): void {
   this.load();
  }
  
  public load() {
    //start
    this.database1.getEmail().then((result) => {
      // start
      this.itemList = <Array<Object>> result;
      this.StudentID = this.itemList[0]["Student_id"];
      this.http.post('http://m.notnul.com/NoteService.svc/SearchNotes',{
        StudentID: this.StudentID,
        SearchString: this.SearchString,
        isAuthor: true
      }).subscribe(res  => {
        console.log(res);
        this.search = res;
      console.log(res);
      JSON.parse(this.search);
      this.search = JSON.parse(this.search);
      console.log(this.search["Details"][0]);
      this.searchURL = this.search["Details"];
      console.log(this.searchURL[0]["Thumbnail_url"]);
      console.log(this.searchURL[0]["Note_ID"]);
      },error => {
        console.log('error')
      });

    })
    // end
  }
}
