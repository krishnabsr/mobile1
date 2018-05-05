import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyuploadsPage } from './myuploads';

@NgModule({
  declarations: [
    MyuploadsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyuploadsPage),
  ],
})
export class MyuploadsPageModule {}
