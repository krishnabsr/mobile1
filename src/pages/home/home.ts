import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchPage } from '../search/search';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
//import { DatabaseProvider } from '../../providers/database/database';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fullname: string;
  params: Object;
  searchPage: any;
  magazines:any = [] ;//magazines array
  imageURL:any = []; // images for magazines
  study: any = []; // study mat's array
  imageStudy: any = []; // images for study mat's
  literature: any = []; // literature array
  literatureBooks: any = [];   
  books : any = [];// home page books array
  booksHome: any = []; //
  competitive: any = [];
  competitiveBooks: any = [];
  subscriptionArray: any = [];
  Subscription: Object;
  //database1: DatabaseProvider;
  subscription : Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient, 
    //database1: DatabaseProvider
  ) {
    this.searchPage = SearchPage;
    this.magazines = '';
    this.imageURL = '';  
    this.study = '';
    this.imageStudy = '';
    this.literature = '';
    this.literatureBooks = '';
    this.books = '';
    this.booksHome = '';
    this.params = {isAuthor:true};
    this.competitive = '';
    this.competitiveBooks = '';
    this.subscriptionArray = '';
    this.Subscription = {};
    this.subscription = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.load(this.Subscription);
  }
  gotoSearch(FullName: string) { 
    
    this.navCtrl.push(SearchPage,{FullName});
  }

  ngOnInit(): void {
    /*
    let db = new SQLite();
    db.create({
      name: "data.db",
      location: "default"
    }).then(( db1: SQLiteObject ) => {
      db1.executeSql("CREATE TABLE IF NOT EXISTS login (Student_id BIGINT  primary key, name text , Email_id text,Valid_upto DATETIME ,Token text,AuthorType_Ids text)",{})
       .then(() => console.log('login created'))
       .catch(e => console.log(e))

       var BOOK_RACK_TABLE = "CREATE TABLE IF NOT EXISTS book_rack (note_id BIGINT  primary key, title text , price NUMERIC(10,2),Student_Currency text ,IMAGE_BASE64 text)";
       var Download_TABLE = "CREATE TABLE IF NOT EXISTS download (note_id BIGINT  primary key, title text , fileurl text ,IMAGE_BASE64 text,Last_rPage text,BookMarks text)";
       var UnlimitedSubscription_TABLE = "CREATE TABLE IF NOT EXISTS UnlimitedSubscription (uplan_id BIGINT  primary key, plan_Name text , IsLimtedByAuthorType BIGINT ,AuthorType_IDs text,IsLimitedByDays BIGINT,Limited_Days text,LD_Time_start text,LD_Time_End text,UnLimitedDays text )";
       var Notification_TABLE = "CREATE TABLE IF NOT EXISTS Notification (Id INTEGER  PRIMARY KEY  AUTOINCREMENT, Title text , Message text ,Note_Id BIGINT,IsRead BIGINT)";
       var pNotesForBook_TABLE = "CREATE TABLE IF NOT EXISTS pNotesForBook (pNotesId INTEGER  PRIMARY KEY  AUTOINCREMENT, Notes text  ,Note_Id BIGINT,PageNo BIGINT )";
   

       db1.executeSql(BOOK_RACK_TABLE,[])
       .then(() => console.log('Created Book rack table'))
       .catch(e => console.log(e))
   
      db1.executeSql(Download_TABLE,[])
      .then(() => console.log('Created Download table'))
      .catch(e  => console.log(e))

      db1.executeSql(UnlimitedSubscription_TABLE,[])
      .then(() => console.log('Created UnlimitedSubscription table'))
      .catch(e => console.log(e))

      db1.executeSql(Notification_TABLE,[])
      .then(() => console.log('Created Notification_TABLE'))
      .catch(e => console.log(e))

      db1.executeSql(pNotesForBook_TABLE,[])
      .then(() => console.log('created pNotesForBook_TABLE'))
      .catch(e => console.log(e))
      })
      .catch(e => console.log(e)); */
    
    this.http.post('http://m.notnul.com/NoteService.svc/GetHomePageMagazineData',{})
    .subscribe(res => {  
      this.magazines = res;
      console.log(res);
      JSON.parse(this.magazines);
      this.magazines = JSON.parse(this.magazines);
      console.log(this.magazines["Details"][0]["ThumbnailURL"]);
      this.imageURL = this.magazines["Details"];
      console.log(this.imageURL[0]);
      console.log('end of magazine data')
    },
  err => {
    console.log('error occured')
  });
  // end for magazines
  //start for study materials
  this.http.post('http://m.notnul.com/NoteService.svc/GetHomePageStudyMaterialsData',{})
  .subscribe(res => {
    this.study = res;
    JSON.parse(this.study);
    this.study = JSON.parse(this.study);
    console.log(this.study["Details"][0]["ThumbnailURL"]);
    this.imageStudy = this.study["Details"];
    console.log(this.imageStudy[0]["FullName"]);
    console.log('end of study materials data');
  },err => {
    console.log('error occurred');
  });
  //end for study materials
  //start for indian literature
  this.http.post('http://m.notnul.com/NoteService.svc/GetHomePageIndianLiteratureData',{})
  .subscribe(res => {
    console.log(res);
    this.literature = res;
    JSON.parse(this.literature);
    this.literature = JSON.parse(this.literature);
    this.literatureBooks = this.literature["Details"];
    console.log(this.literatureBooks[0]["FullName"]);
    console.log('end of literature books ');
  }, err => {
    console.log('error occured');
  });
  //end of literature books
  this.http.post('http://m.notnul.com/NoteService.svc/GetHomePageBooksData',{})
  .subscribe(res => {
    console.log(res);
    this.books = res;
    JSON.parse(this.books);
    this.books = JSON.parse(this.books);
    this.booksHome = this.books["Details"];
    console.log(this.booksHome[0]["FullName"]);
    console.log('end of books home page');
  }, err => {
    console.log('error occured');
  });
  // end of books data
  // start of competitive books
  this.http.post('http://services.notnul.com/NoteService.svc/GetHomePageCompetitiveData',{})
  .subscribe(res => {
    console.log(res);
    this.competitive = res;
    JSON.parse(this.competitive);
    this.competitive = JSON.parse(this.competitive);
    this.competitiveBooks = this.competitive["Details"];
    console.log(this.competitiveBooks[0]);
    console.log('end of competitive books page');
  },err => {
    console.log('error coccures');
  });
  // end of competitive books data 
  // start of url data
  this.http.post('http://services.notnul.com/UserService.svc/GetUnlimitedSubscriptionDetailsForApp',{
    Student_ID: 22
  })
  .subscribe(res => {
  if(res!= false) {
      console.log(res);
      console.log('unlimited subscription')
      this.subscriptionArray = res;
      this.subscriptionArray = JSON.parse(this.subscriptionArray);
      console.log('this is subsccription array ');
      console.log(this.subscriptionArray);
      this.Subscription = {
        uplan_id: parseInt(this.subscriptionArray.uPlanId),   
        plan_Name: this.subscriptionArray.Plan_Name,    
        IsLimtedByAuthorType: (this.subscriptionArray.IsLimtedByAuthorType == 'False' ? 0 : 1),
        AuthorType_IDs: this.subscriptionArray.AuthorType_IDs,
        IsLimitedByDays: (this.subscriptionArray.IsLimitedByDays == 'false' ? 0 : 1),   
        Limited_Days: this.subscriptionArray.Limited_Days,      
        LD_Time_start: this.subscriptionArray.LD_Time_start,     
        LD_Time_End: this.subscriptionArray.LD_Time_End,                   
        UnLimitedDays: this.subscriptionArray.UnLimitedDays
      }
     }
      err => {
      console.log('error occured');
    }
  });
  // end of url data
  }

  public load(subscription){
    this.Subscription = subscription;

  //  this.database1.InsertUnlimitedSubscription(this.Subscription);
  //  this.database1.ValidateUnlimitedSubscription(this.Subscription)
  }
}
