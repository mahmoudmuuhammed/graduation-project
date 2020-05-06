import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ChattingComponent } from './community-part/chatting/chatting.component';
import { ChatRoomComponent } from './community-part/chatting/chat-room/chat-room.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./land-part/land.module').then(m => m.LandModule)
  },
  {
    path: 'community',
    loadChildren: './community-part/community.module#CommunityModule'
  },
  { path: 'chat', component: ChattingComponent, children: [
    { path: ':id', component: ChatRoomComponent }
  ] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
