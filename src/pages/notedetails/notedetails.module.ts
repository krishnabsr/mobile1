import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotedetailsPage } from './notedetails';

@NgModule({
  declarations: [
    NotedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotedetailsPage),
  ],
})
export class NotedetailsPageModule {}
