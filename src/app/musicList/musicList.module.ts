
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicListComponent } from './musicList.component';
import { MusicListRoutes } from './musicList.routing';
import { ShsongComponent } from './shsong/shsong.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  imports: [
    CommonModule,
    MusicListRoutes,
    ShareModule  
  ],
  declarations: [MusicListComponent,
    ShsongComponent
],
  providers:[]
})
export class MusicListModule { }



