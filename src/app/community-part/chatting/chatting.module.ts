import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { ChattingComponent } from './chatting.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatListItemComponent } from './chat-list/chat-list-item/chat-list-item.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersListItemComponent } from './users-list/users-list-item/users-list-item.component';
import { ChatFeedsComponent } from './chat-room/feeds/feeds.component';
import { MessageComponent } from './chat-room/feeds/message/message.component';
import { ChatFormComponent } from './chat-room/chat-form/chat-form.component';
import { ChatHeadComponent } from './chat-room/chat-head/chat-head.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

@NgModule({
    declarations: [
        ChattingComponent,
        ChatListComponent,
        ChatListItemComponent,
        UsersListComponent,
        UsersListItemComponent,
        ChatFeedsComponent,
        MessageComponent,
        ChatFormComponent,
        ChatHeadComponent,
        ChatRoomComponent
    ],
    imports: [
        CommonModule
    ],
    exports: []
})

export class ChattingModule {}