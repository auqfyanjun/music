
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album.component';
import { AlbuminfoComponent } from './albuminfo/albuminfo.component';
import { AlbumlistComponent } from './albumlist/albumlist.component';

const routes: Routes = [
  {path:"",component:AlbumComponent  ,children:[
    {path:"",redirectTo:"list/ALL",pathMatch:"full"},
    {path:"list/:area",component:AlbumlistComponent},
    {path:"info/:id",component:AlbuminfoComponent}
  ]},
];

export const AlbumRoutes = RouterModule.forChild(routes);
