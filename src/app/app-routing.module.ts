import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./land-part/land.module').then(m => m.LandModule)
  },
  {
    path: 'community',
    loadChildren: './community-part/community.module#CommunityModule',
    canActivate:[AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
