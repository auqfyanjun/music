import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { AlbuminfoComponent } from './albuminfo/albuminfo.component';
import { AlbumlistComponent } from './albumlist/albumlist.component';
import { AlbumRoutes } from './album.routing';
import { ShareModule } from '../share/share.module';


@NgModule({
  imports: [
    CommonModule,
    AlbumRoutes,
    ShareModule
  ],
  declarations: [
    AlbumComponent,
    AlbuminfoComponent,
    AlbumlistComponent ]
})
export class AlbumtModule { }
