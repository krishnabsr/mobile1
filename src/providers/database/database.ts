import { HttpClient } from '@angular/common/http';
import { Injectable, COMPILER_OPTIONS } from '@angular/core';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { ResourceLoader } from '@angular/compiler';
import { convertToView } from 'ionic-angular/navigation/nav-util';
import { resolveDefinition } from '@angular/core/src/view/util';
//import { BehaviorSubject } from 'rxjs/Rx';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
 
  User: object;
  user : object;
  Response : any = [];
  email: any= [];
  Email : any; 
  Name: any;
  constructor(public http: HttpClient) {
   // this.databaseReady = new BehaviorSubject(false);
    this.User = {};
    this.user = {};
   this.Email = '';
    this.Name = '';
    console.log('Hello DatabaseProvider Provider');
  }
  ngOnInit() :void {
    this.startDatabase();  
  }

  public startDatabase() {
    var db = new SQLite();
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
      .catch(e => console.log(e));
  }


  public InsertLoginRecord(User) {
    console.log('user in the database.ts');
    console.log(User.StudentID);
    var db = new SQLite();
    console.log('Inserting login record');
    var query = "INSERT INTO login (Student_id,name, Email_id,Token) VALUES (?,?,?,?)";
    db.create({
      name: "data.db",
      location: "default"
    }).then(( db1: SQLiteObject ) => {
      console.log('user in execute sql');
      console.log(User.Token);
      db1.executeSql(query,[User.StudentID,User.Name,User.Email,User.Token])
      .then((res) => console.log('inserted data' + res ))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e));
  }

  public InsertNotification = function(Notification) {
    var db = new SQLite();
    console.log('notification:' + Notification);
    var query = "INSERT INTO Notification (Title, Message,Note_Id,IsRead) VALUES (?,?,?,?)";
    db.create({
      name: "data.db",
      location : "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[Notification.Title, Notification.Message, Notification.Note_Id,0])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e)) 
  }

  public GetNotifications = function() {
    var db = new SQLite();
    var query = "SELECT * from Notification ORDER BY Id DESC";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public RemoveNotification = function(Notification_Id) {
    var db = new SQLite();
    var query = "DELETE FROM Notification WHERE Id = ?";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[Notification_Id])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public UpdateNotificationRead = function(Notification_Id) {
    var db = new SQLite();
    console.log('update author type : ' + Notification_Id);
    var query = "UPDATE Notification SET IsRead = (?) WHERE Id = ?";
    db.create({
      name: "data.db",
      location : "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[1, Notification_Id])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  
  public InsertDownloadlog = function(Note) {
    var db = new SQLite();
    console.log('downloading note :' + Note.noteid);
    var query = "INSERT INTO download (note_id, title,IMAGE_BASE64,fileurl,Last_rPage,BookMarks) VALUES (?,?,?,?,?,?)";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query, [Note.noteid, Note.title, Note.IMAGE_BASE64, Note.fileurl,'1','1'])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  } 
  

  /*
  public InsertDownloadLog = function(downloadArray: any) {
 //   console.log(downloadArray[0]);
    var db = new SQLite();
   // var query = "INSERT INTO download (note_id, title,IMAGE_BASE64,fileurl,Last_rPage,BookMarks) VALUES (?,?,?,?,?,?)";
    downloadArray.forEach(element => {
      console.log(element);
    });
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      downloadArray.forEach(element => {
        db1.executeSql("INSERT INTO download (note_id, title,IMAGE_BASE64,fileurl,Last_rPage,BookMarks) VALUES (?,?,?,?,?,?)",[element.Note_ID,element.Title,element.price,element.Thumbnail_url,element.Note_url,'1','1'])  
      }).then((res) => console.log('inserted data' + res))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))

   // console.log(downloadArray[0]["price"]);
  //  console.log(downloadArray[0]["Note_url"])
  }   */
 
  public AddToBookRack = function(Note) {
    var db = new SQLite();
    console.log('adding note :' + Note.note_id);
    var query = "INSERT INTO book_rack (note_id, title,price,Student_Currency,IMAGE_BASE64) VALUES (?,?,?,?,?)";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[Note.note_id, Note.title, Note.price, Note.Student_Currency, Note.IMAGE_BASE64])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public AddBookMark = function(Noteid,Page) {
    var db = new SQLite();
    console.log('adding bookmark' + Page );
    var query = "UPDATE download SET BookMarks = (?) WHERE note_id = ?";
    db.create({
      name : "data.db",
      location : "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[Page,Noteid])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public AddReadLastPAge = function(Noteid, LastPage) {
    var db = new SQLite();
    console.log('adding BookMark :' + LastPage);
    var query = "UPDATE download SET Last_rPage = (?) WHERE note_id = ?";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject)=> {
      db1.executeSql(query,[LastPage, Noteid])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public InsertUnlimitedSubscription(Subscription) {
    var db = new SQLite();
    console.log('Inserting into unlimited subscription');
    var query1 = "DELETE FROM UnlimitedSubscription";
    var query = "INSERT INTO UnlimitedSubscription (uplan_id,plan_Name, IsLimtedByAuthorType,AuthorType_IDs,IsLimitedByDays,Limited_Days,LD_Time_start,LD_Time_End,UnLimitedDays) VALUES (?,?,?,?,?,?,?,?,?)";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject ) => {
      db1.executeSql(query1,[])
      .then(() => console.log('cleared data from unlimited subscription table'))
      .catch(e => console.log(e))

      db1.executeSql(query,[Subscription.uplan_id, Subscription.plan_Name, Subscription.IsLimtedByAuthorType, Subscription.AuthorType_IDs, Subscription.IsLimitedByDays, Subscription.Limited_Days, Subscription.LD_Time_start, Subscription.LD_Time_End, Subscription.UnLimitedDays])
      .then(() => console.log('inseeted data into unlimited subscription'))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e));
  }

  public InsertNotesForBook = function (NoteId,Notes,PageNo) {
    var db = new SQLite();
    var query = "INSERT INTO pNotesForBook (Notes, Note_Id,PageNo) VALUES (?,?,?)";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[Notes, NoteId, PageNo])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public GetAllNotesOfBook = function (NoteId) {
    var db = new SQLite();
    var query = "SELECT * from pNotesForBook where Note_Id=?";
    db.create({
      name: "data.db",
      location : "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[NoteId])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public GetPnotesCount = function () {
    var db = new SQLite();
    var query = "SELECT count(*) as count from pNotesForBook ";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject)=> {
      db1.executeSql(query,[])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e)) 
  }
  

  public GetpNotes = function (pNoteId) {
    var db = new SQLite();
    var query = "SELECT * from pNotesForBook where pNotesId=?";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[pNoteId])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public UpdatePNotesForBook = function (pNoteId,notesText) {
    var db = new SQLite();
    var query = "UPDATE pNotesForBook SET Notes = (?) WHERE pNotesId = ?";
    db.create({
      name: "data.db",
      location : "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[notesText, pNoteId])
      .then((resultSet) => console.log(resultSet))
      .catch(e  => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public DeletePNotesForBook = function (pNotesId) {
    var db = new SQLite();
    var query = "Delete FROM pNotesForBook  WHERE pNotesId = ?";
    db.create({
      name:"data.db",
      location:"default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[pNotesId])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public ClearAllPNotesForBook = function (NoteId) {
    var db = new SQLite();
    var query = "Delete FROM pNotesForBook  WHERE Note_Id = ?";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[NoteId])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public GetUnlimitedSubscription() {
    var db = new SQLite();
    var query = "SELECT * from UnlimitedSubscription";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e)) 
    })
    .catch(e => console.log(e))
  }

  public clearUnlimitedSubscriptionLog = function () {
    var db = new SQLite();
    var query = "DELETE FROM UnlimitedSubscription";
    db.create({
      name: "data.db",
      location:"default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }



  
  public ValidateUnlimitedSubscription = function(Authors_type){
    var db = new SQLite();
    var query = "SELECT * from UnlimitedSubscription";
    db.create({
      name: "data.db",
      location: "default"
    }).then(( db1: SQLiteObject ) => {
      db1.executeSql(query,[])
      .then((resultSet) => {
        console.log(resultSet);
        if(resultSet.res.rows.length > 0){
          var IsValidTime = false;
          if(parseInt(resultSet.res.rows.item(0).IsLimitedByDays.toString()) == 1 ) {
            var limitedDays = resultSet.res.rows.item(0).Limited_Days.toString();
            var d = new Date();
            var n = (d.getDay()) + 1;
            if(limitedDays.split(',').indexOf(n.toString()) > -1 ) {
              var startTime = resultSet.res.rows.item(0).LD_Time_start.toString();
              var endTime = resultSet.res.rows.item(0).LD_Time_End.toString();

              var currentDate = new Date();
              var startDate = new Date(currentDate.getTime());
              startDate.setHours(startTime.split(":")[0]);
              startDate.setMinutes(startTime.split(":")[1]);
              startDate.setSeconds(startTime.split(":")[2]);

              var endDate = new Date(currentDate.getTime());
              endDate.setHours(endTime.split(":")[0]);
              endDate.setMinutes(endTime.split(":")[1]);
              endDate.setSeconds(endTime.split(":")[2]);
              if (startDate <= currentDate && endDate >= currentDate) {
                IsValidTime = false;
            }
            else {
                IsValidTime = true;
            }

            if(IsValidTime) {
              if(parseInt(resultSet.res.rows.item(0).IsLimtedByAuthorType.toString()) == 1 ){
                var AuthorType_IDs = resultSet.res.rows.item(0).AuthorType_IDs.toString();
                  if(AuthorType_IDs.split(',').indexOf(Authors_type) > -1 ) {
                    return new Promise((resolve,reject) => resolve(true));
                    }
                  else {
                    return new Promise((resolve,reject) => resolve(false));
                    }
              }
              return  new Promise((resolve,reject) => resolve(true));  
            }
              else {
                return new Promise((resolve,reject) => resolve(false));
              }
            }
          else {
            return new Promise((resolve,reject) => resolve(false))
          }
           
          }
        }
        return new Promise((resolve,reject) => resolve(false))
      });
        
            
    })
  }

  public RemoveFromBookrack = function (note_id){
    var db = new SQLite();
    var query = "DELETE FROM book_rack WHERE note_id = ?";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query, [note_id])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public RemoveFromDownloadLog = function (note_id) {
    var db = new SQLite();
    var query = "DELETE FROM download WHERE note_id = ?;";
    var query2 = "Delete FROM pNotesForBook  WHERE Note_Id = ?";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query, [note_id])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))

      db1.executeSql(query2,[note_id])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))

    })
    .catch(e => console.log(e))
  }

    public getNoteFromBookRack = function (note_id) {
      var db = new SQLite();
      var query = "select * FROM book_rack WHERE note_id = ?";
      db.create({
        name: "data.db",
        location: "default"
      }).then((db1: SQLiteObject) => {
        db1.executeSql(query,[note_id])
        .then((resultSet) => console.log(resultSet))
        .catch(e => console.log(e))
      })
      .catch(e => console.log(e))
    }

 
  public getNoteFromDownloadLog = function(note_id) {
    var db = new SQLite();
    var query = "select * FROM download WHERE note_id = ?";
    db.create({
      name : "data.db",
      location : "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[note_id])
      .then((resultSet ) => console.log(resultSet))
      return new Promise((resolve,reject) => resolve('returned data'))

    },(error) => {
      console.log(error);
      return new Promise((resolve,reject) => reject('error'))
    })
  }
  

  public getAllLoginRecords = function () {
    var db = new SQLite();
    var query = "SELECT * from login";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[])
      .then( (res) => {
        console.log(res)
        JSON.stringify(res.rows)
        console.log(res.rows.item(0) + 'loginrecords');
      })
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public GetAllBookRackRecords = function () {
    var db = new SQLite();
    var query = "SELECT * from book_rack";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[])
      .then((resultSet) => console.log(resultSet))
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public GetAllDownloadRecords = function () {
    var db = new SQLite();
    var query = "SELECT * from download";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[])
      .then((res) => {
        console.log(res)
        JSON.stringify(res.rows)
        console.log(res.rows.item(0) )
      })
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }

  public RemoveAllRecordsFromBookRack = function (){
    var db = new SQLite();
    var query = "DELETE FROM book_rack";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
      db1.executeSql(query,[])
      .then((resultSet) => console.log())
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
  }
  public logout() {
    var db = new SQLite();
    var querylogin = "DROP TABLE login";
    var querylogincreate = "CREATE TABLE IF NOT EXISTS login (Student_id BIGINT  primary key, name text , Email_id text,Valid_upto DATETIME ,Token text)";
    var querydownload = "DROP TABLE download";
    var querydownloadcreate = "CREATE TABLE IF NOT EXISTS download (note_id BIGINT  primary key, title text , fileurl text ,IMAGE_BASE64 text,Last_rPage text,BookMarks text)";
    var querybook = "DROP TABLE book_rack";
    var querybookcreate = "CREATE TABLE IF NOT EXISTS book_rack (note_id BIGINT  primary key, title text , price NUMERIC(10,2),Student_Currency text ,IMAGE_BASE64 text)";
    var querySubscription = "DROP TABLE UnlimitedSubscription";
    var querySubscriptionCreate = "CREATE TABLE IF NOT EXISTS UnlimitedSubscription (uplan_id BIGINT  primary key, plan_Name text , IsLimtedByAuthorType BIGINT ,AuthorType_IDs text,IsLimitedByDays BIGINT,Limited_Days text,LD_Time_start text,LD_Time_End text,UnLimitedDays text )";
    var query2 = "DROP TABLE Notification";
    var Notification_TABLE = "CREATE TABLE IF NOT EXISTS Notification (Id BIGINT  primary key  AUTOINCREMENT, Title text , Message text ,Note_Id BIGINT,IsRead BIGINT)";
    var queryNotes = "DROP TABLE pNotesForBook";
    var pNotesForBook_TABLE = "CREATE TABLE IF NOT EXISTS pNotesForBook (pNotesId INTEGER  PRIMARY KEY  AUTOINCREMENT, Notes text  ,Note_Id BIGINT,PageNo BIGINT )";

    db.create({
      name: "data.db",
      location: "default" 
    }).then((db1: SQLiteObject) => {
      db1.executeSql(querylogin,[])
      console.log('Login table dropped')

      db1.executeSql(querylogincreate,[])
      .then((res) => console.log('login table created'))
      .catch(e => console.log(e))

      db1.executeSql(querydownload,[])
      .then((res) => console.log('download table dropped'))

      db1.executeSql(querydownloadcreate,[])
      .then((res) => console.log('download table created'))
      .catch(e => console.log(e))

      db1.executeSql(querybook,[])
      .then((res) => console.log("book rack table dropped"))
      
      db1.executeSql(querybookcreate,[])
      .then((res) => console.log('book_rack table created'))
      .catch(e => console.log(e))

      db1.executeSql(querySubscription,[])
      .then((res) => console.log('un limited subscription table created'))
      .catch(e => console.log(e))

      db1.executeSql(querySubscriptionCreate,[])
      .then((res) => console.log('Unlimited subscription table created'))
      .catch(e => console.log(e))

      db1.executeSql(query2,[])
      .then((res) => console.log("Notification table dropped"))

      db1.executeSql(Notification_TABLE, [])
      .then((res) => console.log('notification table created') )
      .catch(e => console.log(e))

      db1.executeSql(queryNotes,[])
      .then((res) => console.log('pNotesForBook table dropped'))

      db1.executeSql(pNotesForBook_TABLE,[])
      .then((res) => console.log('pNotesForBook table created'))
      .catch(e => console.log(e))
      
    })
    .catch(e => console.log(e))
  }

  public retrieveEmail(): string  {
    console.log('starting reTEMAIL');
    this.Email ='';
    //var email:any = [];
    //var Email :string;
    var email_id: string;
    var db = new SQLite();
    var query = "SELECT Email_id  FROM login";
    console.log('after query');
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject) => {
     db1.executeSql(query,[])
   .then((res) => {
        console.log(res);
        JSON.stringify(res.rows);
        this.Email = res.rows.item(0)["Email_id"];
        console.log(this.Email+ 'in thje loop');
        return res.rows.item(0)["Email_id"]
      })
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e)) 

    console.log(this.Email+'outer');
   return this.Email;   
  
  }

  public retrieveName(): string {
  //  var Name : string;
    var db = new SQLite();
    var query = "SELECT name FROM login";
    db.create({
      name: "data.db",
      location: "default"
    }).then((db1: SQLiteObject ) => {
      db1.executeSql(query,[])
      .then((res) => {
        console.log(res)
        JSON.stringify(res.rows)
        this.Name = res.rows.item(0)["name"]
      })
      .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
    console.log(this.Name + 'outer')
    return this.Name;
  }


  // promise start
   public getEmail() {
     return new Promise((resolve,reject) => {
        var db = new SQLite();
        var query = "SELECT * FROM login";
       // var query = "SELECT Email_id FROM login";
        db.create({
          name: "data.db",
          location: "default"
        }).then((db1: SQLiteObject) => {
          db1.executeSql(query,[])
          .then((res) => {
            let people = [];
            if(res.rows.length > 0 ) {
              people.push(res.rows.item(0))
             // people.push(res.rows.item(0)["Email_id"])
            }
            resolve(people)
          },(error) => {
            reject(error);
          });
        });
     })
   }
  // promise end  

   public getDownload() {
     return new Promise((resolve,reject) => {
      var db = new SQLite();
      var query = "SELECT * from download";
      db.create({
        name: "data.db",
        location: "default"
      }).then((db1: SQLiteObject) => {
        db1.executeSql(query,[])
        .then((res) => {
          let down = [];
          if(res.rows.length > 0) {
            down.push(res.rows.item(0))
          }
          resolve(down)
        },(error) => {
          reject(error);
        })
      })
     })
   }

  }

