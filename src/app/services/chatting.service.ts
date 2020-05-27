import { Injectable } from "@angular/core";
import { AngularFirestore, 
        AngularFirestoreCollection, 
        AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Message } from '../models/message.model';
import { Thread, Members } from '../models/thread.model';

@Injectable({
    providedIn: 'root'
})

export class ChattingService {
    threadCollection: AngularFirestoreCollection<Thread>;
    threadDoc: AngularFirestoreDocument<Thread>;

    messagesCollection: AngularFirestoreCollection<Message>;
    messageDoc: AngularFirestoreDocument<Message>;

    constructor(
        private afs: AngularFirestore,
        private authService: AuthService
        ) {}

    timeStamp() {
        let date = new Date();
        let hours = date.getHours();
        let mins = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        mins = mins < 10 ? 0 + mins : mins;
        const result = hours + ':' + mins + ' ' + ampm;
        return result;
    }

    getMessages(channelId: string) {
        const path = `Chats/${ channelId }/Messages`;
        this.messagesCollection = this.afs
        .collection(path, ref => { return ref.orderBy("timeStamp") });

        return this.messagesCollection.valueChanges();
    }

    sendMessage(
        threadId: string,
        messageContent: string,
        currentUser: string,
        profileId: string
    ) {
        const messageData: Message = {
            content: messageContent,
            senderId: currentUser,
            timeStamp: Date.now()
        };
        const members = { [currentUser]: 0, [profileId]: 0 };
        const thread: Thread = { threadId, members };
        const path = `Chats/${ threadId }/Messages`;
        this.afs.collection(`Chats`)
        .doc(threadId)
        .set(thread)
        .then(
            threadCreated => {
                console.log('thread created');
                this.afs.collection(path)
                .add(messageData)
                .then(
                    messageSent => {
                        console.log('message sent');
                    }
                )
            }
        )
    }

    getThreads(currentUserId: string) {
        this.threadCollection = this.afs.collection('Chats',
        ref => { return ref
            .where(`members.${currentUserId}`, '<=', 0)
             });
        return this.threadCollection.valueChanges();
    }

    getThread(profileId: string) {
        this.threadDoc = this.afs.doc<Thread>(`Chats/${ profileId }`);
        return this.threadDoc.valueChanges();
    }

    saveLastMessage(threadId: string, message: string) {
        const data = {
            lastMsg: message,
            timeStamp: Date.now()
        };

        return this.afs.doc(`Chats/${threadId}`).update(data);
    }
}