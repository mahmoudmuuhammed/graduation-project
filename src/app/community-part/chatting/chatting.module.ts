import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { ChattingComponent } from './chatting.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatListItemComponent } from './chat-list/chat-list-item/chat-list-item.component';
import { ChatFeedsComponent } from './chat-room/feeds/feeds.component';
import { MessageComponent } from './chat-room/feeds/message/message.component';
import { ChatFormComponent } from './chat-room/chat-form/chat-form.component';
import { ChatHeadComponent } from './chat-room/chat-head/chat-head.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { communityRoutingModule } from '../community-routing.module';

@NgModule({
    declarations: [
        ChattingComponent,
        ChatListComponent,
        ChatListItemComponent,
        ChatFeedsComponent,
        MessageComponent,
        ChatFormComponent,
        ChatHeadComponent,
        ChatRoomComponent
    ],
    imports: [
        CommonModule,
        communityRoutingModule,
        
    ],
    exports: [
        ChattingComponent
    ]
})

export class ChattingModule {}