import { TowanPipe } from './../allservices/towan.pipe';
import { NgModule } from '@angular/core';
import { CommonComponent } from './common/common.component';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { FormsModule } from '@angular/forms';
import { TimeformatPipe } from '../allservices/timeformat.pipe';
// import { NorightComponent } from './noright/noright.component';

@NgModule({

  declarations: [
    TowanPipe,
    TimeformatPipe,
    CommonComponent,
    PageComponent,
    // NorightComponent
],
  imports: [
    CommonModule,
    FormsModule 
  ],  
  exports:[TowanPipe,CommonComponent,PageComponent,TimeformatPipe]
  
})
export class ShareModule { }
