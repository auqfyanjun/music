import { ArtilistComponent } from './artilist.component';
import { Routes, RouterModule } from '@angular/router';

import { AllsgComponent } from './allsg/allsg.component';
import { OnesgComponent } from './onesg/onesg.component';
import { Top50Component } from './onesg/top50/top50.component';
import { AlbumComponent } from './onesg/album/album.component';
import { MvComponent } from './onesg/mv/mv.component';
import { DescComponent } from './onesg/desc/desc.component';
import { OursingerComponent } from './allsg/oursinger/oursinger.component';
import { SgbytypeComponent } from './allsg/sgbytype/sgbytype.component';
import { SugComponent } from './allsg/sug/sug.component';


const routes: Routes = [
  {
    path: "", component: ArtilistComponent,
    children: [
      { path: "", redirectTo: "allsg", pathMatch: "full" },
      {
        path: "onesg/:singerid", component: OnesgComponent,
        children: [
          { path: "", redirectTo: "topwushi", pathMatch: "full" },
          { path: "topwushi", component: Top50Component },
          { path: "album", component: AlbumComponent },
          { path: "mv", component: MvComponent },
          { path: "desc", component: DescComponent },
        ]
      },
      {
        path: "allsg", component: AllsgComponent,
        children: [
          { path: "", redirectTo: "sug/wy", pathMatch: "full" },
          { path: "sug/wy", component: SugComponent },
          { path: "oursinger/wy", component: OursingerComponent },
          { path: "sgby/:typeid", component: SgbytypeComponent }
        ]
      }
    ]
  }

];

export const ArtilistRoutes = RouterModule.forChild(routes);



















