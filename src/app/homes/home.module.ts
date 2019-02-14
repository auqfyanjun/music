import { ShareModule } from './../share/share.module';






import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomesRoutes } from './homes.routing';

import { UserinfoComponent } from './../one/userinfo/userinfo.component';
import { BillboardComponent } from './../one/billboard/billboard.component';
import { AsupBarComponent } from './../one/asupbar/asupbarcomponent';
import { SuggestComponent } from './../one/suggest/suggest.component';
import { TopMusicComponent } from './../one/topMusic/topMusic.component';
import { HomesComponent } from './homes.component';
import { NavBarComponent } from '../one/navBar/navBar.component';
import { NavbarsupComponent } from '../one/navbarsup/navbarsup.component';
import { RecommonComponent } from '../one/recommon/recommon.component';
import { MymusicComponent } from '../one/mymusic/mymusic.component';
import { FriendComponent } from '../one/friend/friend.component';
import { ProductComponent } from '../one/product/product.component';
import { LoadComponent } from '../one/load/load.component';
import { EntersingerComponent } from '../one/entersinger/entersinger.component';
import { LivelistComponent } from './../one/livelist/livelist.component';
import { CarouseComponent } from '../one/carouse/carouse.component';

import { SuggestService } from '../allservices/suggest.service';
import { AllplaylistService } from '../allservices/allplaylist.service';
import { CommonService } from '../allservices/common.service';
import { AlbumService } from '../allservices/album.service';
import { ArtService } from '../allservices/art.service';
import { BillboardService } from './../allservices/billboard.service';


@NgModule({

  declarations: [
    HomesComponent,
    NavBarComponent,
    NavbarsupComponent,
    RecommonComponent,
    MymusicComponent,
    FriendComponent,
    ProductComponent,
    LoadComponent,
    TopMusicComponent,
    SuggestComponent,
    AsupBarComponent,
    BillboardComponent,
    UserinfoComponent,
    EntersingerComponent,
    LivelistComponent,
    CarouseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomesRoutes,
    ShareModule

  ],
  exports: [HomesComponent],
  providers: [
    SuggestService,
    BillboardService,
    AllplaylistService,
    CommonService,
    AlbumService,
    ArtService]
})
export class HomeModule { }

