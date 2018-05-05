import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the MydownloadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mydownloads',
  templateUrl: 'mydownloads.html',
})
export class MydownloadsPage {

  public itemList : Array<Object>;
  studentid: any;
  download:any = [];
  downloadURL:any = [];
  Notes: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public database1: DatabaseProvider,private http: HttpClient) {
    this.itemList = [];
    this.studentid = '';
    this.download = '';
    this.downloadURL = '';
    this.Notes = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MydownloadsPage');
    this.load();
  }

  public load() {
   this.database1.getEmail().then((result) => {
      this.itemList = <Array<Object>> result;
      this.studentid = this.itemList[0]["Student_id"];
      this.http.post('http://services.notnul.com/NoteService.svc/GetDownloadedNotes',{
        StudentID: this.studentid
       // StudentID: 22
      }).subscribe(res => {
        if(res != false ) {
          console.log(res)
          this.download = res;
          JSON.parse(this.download);
          this.download = JSON.parse(this.download);
          this.downloadURL = this.download["Details"];
          console.log(this.downloadURL.length);
          console.log(this.downloadURL[0]);
          console.log(this.downloadURL[0].Note_ID)
          for(var i = 0;i< this.downloadURL.length;i++){
            console.log( this.downloadURL[i].Note_ID);
          
          
          var Note = {
            note_id : this.downloadURL.Note_ID,
            title: this.downloadURL.title,
            IMAGE_BASE64: this.downloadURL.Thumbnail_url,
            fileurl: this.downloadURL.Note_url
          }
        }


          console.log(Note.note_id);
     //     this.insert(this.downloadURL);
        } else {
          alert('no downloads'); 
        }
       
      },error => {
        console.log('error');
        })
    })
  }

/*
  public insert(downloadURL){
    this.database1.InsertDownloadLog(downloadURL);
  } */

  public insertToDownload(Note_ID: any,Title: any,Thumbnail_url: any,Note_url: any) {
    var Note = { 
      noteid: Note_ID,
      title: Title,
      IMAGE_BASE64: Thumbnail_url,
      fileurl: Note_url
    }
    this.database1.InsertDownloadlog(Note);

  }


  
}

