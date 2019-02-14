import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtilistRoutes } from './artilist.routing';
import { ArtilistComponent } from './artilist.component';

import { AllsgComponent } from './allsg/allsg.component';
import { OnesgComponent } from './onesg/onesg.component';
import { Top50Component } from './onesg/top50/top50.component';
import { AlbumComponent } from './onesg/album/album.component';
import { DescComponent } from './onesg/desc/desc.component';
import { MvComponent } from './onesg/mv/mv.component';
import { OursingerComponent } from './allsg/oursinger/oursinger.component';

import { TypelistComponent } from './allsg/typelist/typelist.component';
import { SgbytypeComponent } from './allsg/sgbytype/sgbytype.component';
import { SugComponent } from './allsg/sug/sug.component';
import { SingerlistComponent } from './allsg/singerlist/singerlist.component';
import { ShareModule } from '../share/share.module';




@NgModule({
  imports: [
    CommonModule,
    ArtilistRoutes,
    ShareModule
  ],
  declarations: [ArtilistComponent,
   
    Top50Component,
    AlbumComponent,
    DescComponent,
    MvComponent,
    TypelistComponent,
    SingerlistComponent,
  
    SugComponent,
    OursingerComponent,
    SgbytypeComponent,
    AllsgComponent,
    OnesgComponent
],
providers:[]

})
export class ArtilistModule { }
