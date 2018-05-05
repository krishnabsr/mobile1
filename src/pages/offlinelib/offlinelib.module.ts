import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflinelibPage } from './offlinelib';

@NgModule({
  declarations: [
    OfflinelibPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflinelibPage),
  ],
})
export class OfflinelibPageModule {}
