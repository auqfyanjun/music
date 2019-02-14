
import { Routes, RouterModule } from '@angular/router';
import { MusicListComponent } from './musicList.component';
import { ShsongComponent } from './shsong/shsong.component';

const routes: Routes = [
  {
    path: "", component: MusicListComponent,
    children: [
      { path: "", redirectTo: "shsong", pathMatch: "full" },
      { path: "shsong", component: ShsongComponent }
    ]
  }
];

export const MusicListRoutes = RouterModule.forChild(routes);
