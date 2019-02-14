import { Routes, RouterModule, PreloadAllModules, } from '@angular/router';
import { HomesComponent } from './homes/homes.component';

const routes: Routes = [
  { path: "", redirectTo: "homes", pathMatch: "full" },
  { path: "homes", loadChildren: "./homes/home.module#HomeModule" },
];

// const routes: Routes = [
//   { path: "", redirectTo: "homes", pathMatch: "full" },
//   { path: "homes", component:HomesComponent },
// ];

// export const AppRoutes = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
export const AppRoutes = RouterModule.forRoot(routes);