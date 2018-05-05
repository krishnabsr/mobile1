import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MydownloadsPage } from './mydownloads';

@NgModule({
  declarations: [
    MydownloadsPage,
  ],
  imports: [
    IonicPageModule.forChild(MydownloadsPage),
  ],
})
export class MydownloadsPageModule {}
