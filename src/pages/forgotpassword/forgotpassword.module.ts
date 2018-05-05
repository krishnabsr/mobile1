import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotpasswordPage } from './forgotpassword';
import { ResetPage } from '../reset/reset';
@NgModule({
  declarations: [
    ForgotpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotpasswordPage),
  ],
  entryComponents: [
    ForgotpasswordPage
  ]
})
export class ForgotpasswordPageModule {}
