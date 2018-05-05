import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  doRefresh(refresher) {
    setTimeout(() => {
      this.load();
      refresher.complete();
    },2000)
  
  }
  email:any;
  balances : any = [];
  balance : any;
  currency: any;
  amount: any;
  remarks: any;
  studentid: any;
 // transactionid: any;
  public itemList : Array<Object>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public database1: DatabaseProvider,public http: HttpClient ) {
    this.email = '';
    this.balances = '';
    this.balance = '';
    this.currency = '';
    this.itemList = [];
    this.amount = '';
    this.remarks = '';
    this.studentid = '';
   // this.transactionid = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

  

  ngOnInit() {
    this.load();
    

    /*
 //   this.email =  this.database1.retrieveEmail();
    console.log(this.email+ 'wallet email');
    this.http.post('http://services.notnul.com/UserService.svc/GetUserBalance',{
      Email : this.email
    })
    .subscribe(res => {
      console.log(res);
      this.balances = res;
      this.balances = JSON.parse(this.balances);
      console.log(this.balances["Balance"]);
      console.log(this.balances["Currency"]);
      this.balance = JSON.parse(this.balances["Balance"]);
      this.currency = this.balances["Currency"];
      console.log(this.currency);
    })  */
  }

  public load() {
    this.database1.getEmail().then((result) => {
      this.itemList = <Array<Object>> result;
      this.email = this.itemList[0]["Email_id"];
      //http ops start
      this.http.post('http://services.notnul.com/UserService.svc/GetUserBalance',{
        Email : this.email
      }).subscribe(res => {
        console.log(res)
        this.balances = res;
        this.balances = JSON.parse(this.balances);
        console.log(this.balances["Balance"]);
        console.log(this.balances["Currency"]);
        this.balance = JSON.parse(this.balances["Balance"]);
        this.currency = this.balances["Currency"];
        console.log(this.currency);
      })
      // http ends
      console.log(this.itemList[0]);
    },(error) =>{
      console.log("Error:" ,error);
    });
  }
 

  public transaction(amount,remarks) {
   
    this.database1.getEmail().then((result) => {
      this.itemList = <Array<Object>> result;
      this.studentid = this.itemList[0]["Student_id"];
      this.http.post('http://services.notnul.com/UserService.svc/CreateTransactionLog',{
        StudentID: this.studentid,
        Amount: amount,
        Remarks: remarks
      }).subscribe(res => {
        if(res != false) {
          var transactionid: any;
          transactionid = res;
          console.log(transactionid);
          console.log('transaction true');
          var amountinPaise = parseInt(amount) * 100;
          var successCallback = (payment_id) => {
          //  alert(transactionid);
          //  alert(payment_id.razorpay_payment_id);
            this.http.post('http://services.notnul.com/UserService.svc/UpdateRazorTransactionLog',{
              NotNulTransactionID: transactionid,
              BankTransactionID:  payment_id.razorpay_payment_id,
              TransactionStatus: "success"
            }).subscribe(res => {
              alert(res)
              this.load();
            });
           
          } 

          var options = {
            description: 'For NotNul',
            image: 'http://notnul.com/Images/logo.png',
            currency: 'INR',
            key: 'rzp_live_RdETh1T2ADGF2a',
            amount: amountinPaise,
            name: 'NotNul Technologies Pvt Ltd',
            prefill: {
            email: this.itemList[0]["Email_id"],
            name: this.itemList[0]["name"]
            },
            "notes": {
            "NotNul_TransactionID": transactionid
            },
            theme: {
            color: '#F37254'
            }
          };

          var cancelCallback = (error) => {
            alert(error.description + ' (Error)')
          }
         
          RazorpayCheckout.on('payment.success', successCallback);
          RazorpayCheckout.on('payment.cancel', cancelCallback);
          RazorpayCheckout.open(options);
         
        } else if(res === false ) {
          console.log('transaction false');
        }
      },error => {
        console.log(error);
      });
    })
    
  }

  
  
  
}


