import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Message } from '../models/message.model';
import { Room } from '../models/Room.model';
import { take, map } from 'rxjs/operators';
import { Observable, observable, merge, Subject } from 'rxjs';
import { formatDate } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
// import {HttpResponse} from '@angular/common/http';
// import {Http, ResponseContentType} from '@angular/http';

@Injectable({
    providedIn: 'root'
})

export class ChattingService {
    // threadCollection: AngularFirestoreCollection<Thread>;
    // threadDoc: AngularFirestoreDocument<Thread>;

    roomsCollection: AngularFirestoreCollection<Room>
    roomsDoc: AngularFirestoreDocument<Room>

    messagesCollection: AngularFirestoreCollection<Message>;
    messageDoc: AngularFirestoreDocument<Message>;

    constructor(
        private afs: AngularFirestore,
        private storage: AngularFireStorage,
    ) { }

    // timeStamp() {
    //     let date = new Date();
    //     let hours = date.getHours();
    //     let mins = date.getMinutes();
    //     let ampm = hours >= 12 ? 'PM' : 'AM';
    //     hours = hours % 12;
    //     hours = hours ? hours : 12;
    //     mins = mins < 10 ? 0 + mins : mins;
    //     const result = hours + ':' + mins + ' ' + ampm;
    //     return result;
    // }

    // getMessages(channelId: string) {
    //     const path = `Chats/${channelId}/Messages`;
    //     this.messagesCollection = this.afs
    //         .collection(path, ref => { return ref.orderBy("timeStamp") });

    //     return this.messagesCollection.valueChanges();
    // }

    // sendMessage(
    //     threadId: string,
    //     messageContent: string,
    //     currentUser: string,
    //     profileId: string
    // ) {
    //     const messageData: Message = {
    //         content: messageContent,
    //         senderId: currentUser,
    //         timeStamp: Date.now()
    //     };
    //     const members = { [currentUser]: 0, [profileId]: 0 };
    //     const thread: Thread = { threadId, members };
    //     const path = `Chats/${threadId}/Messages`;
    //     this.afs.collection(`Chats`)
    //         .doc(threadId)
    //         .set(thread)
    //         .then(
    //             threadCreated => {
    //                 console.log('thread created');
    //                 this.afs.collection(path)
    //                     .add(messageData)
    //                     .then(
    //                         messageSent => {
    //                             console.log('message sent');
    //                         }
    //                     )
    //             }
    //         )
    // }

    //getThreads(currentUserId: string) {
    // this.threadCollection = this.afs.collection('Chats',
    //     ref => {
    //         return ref
    //             .where(`members.${currentUserId}`, '<=', 0)
    //     });
    // return this.threadCollection.valueChanges();
    //}

    //getThread(profileId: string) {
    // this.threadDoc = this.afs.doc<Thread>(`Chats/${profileId}`);
    // return this.threadDoc.valueChanges();
    //}

    //saveLastMessage(threadId: string, message: string) {
    // const data = {
    //     lastMsg: message,
    //     timeStamp: Date.now()
    // };

    // return this.afs.doc(`Chats/${threadId}`).update(data);
    //}


    //--------------------- Moemen work -----------------------

    showImgSubject = new Subject<string>()

    // downloadFile(url:string): Observable<any> {
    //     return this.http.get(url, { responseType: ResponseContentType.Blob });
    // }

    getRoomId(toId: string, myId: string): Observable<string> {
        let roomId = ""
        let isRoomExist: boolean = false;
        this.roomsCollection = this.afs.collection('Rooms')

        return new Observable(observer => {
            this.roomsCollection.valueChanges({ source: 'server' }).pipe(take(1)).subscribe(rooms => {
                rooms.forEach(room => {
                    if (Object.keys(room.users).indexOf(toId) > -1 && Object.keys(room.users).indexOf(myId) > -1) {
                        isRoomExist = true;
                        roomId = room.RoomID
                        console.log('1 : ', isRoomExist)
                    }
                })
                if (!isRoomExist) {
                    console.log('2 : ', isRoomExist)
                    let users = {}
                    users[toId] = 0
                    users[myId] = 0
                    roomId = this.afs.createId();
                    const path = `Rooms/${roomId}`
                    this.afs.doc(path).set({ msg: '', msgtype: '0', timestamp: new Date(), uid: myId, users, RoomID: roomId, paymentTime: Date.now() })
                }
            }).add(() => observer.next(roomId))
        });
    }

    getRoomData(roomId: string) {
        return this.afs.doc<Room>(`Rooms/${roomId}`).valueChanges().pipe(take(1));
    }
    updatePaymentTime(roomId: string) {
        return this.afs.doc(`Rooms/${roomId}`).update({ paymentTime: Date.now() });
    }

    sendMessage(roomId: string, messageContent: string, currentUser: string, profileId: string, msgType: string, file: { filename: string, filesize: number }) {
        this.afs.doc(`Rooms/${roomId}`).valueChanges().pipe(take(1)).subscribe((room: Room) => {

            //justify number of unread message for other user
            let unreadNoOfOtherUser: number = 0
            unreadNoOfOtherUser = room.users[profileId]
            let users = {};
            users[currentUser] = 0;
            users[profileId] = unreadNoOfOtherUser + 1

            //add room data and check type of msg (file or not)
            let roomData: Room = { msg: messageContent, msgtype: msgType, RoomID: roomId, timestamp: new Date(), uid: currentUser, users };
            if (file != null) {
                roomData.filename = file.filename;
                roomData.filesize = file.filesize.toString();
            }

            this.afs.collection(`Rooms`)
                .doc(roomId)
                .update(roomData)
                .then(() => {
                    let msgId = this.afs.createId();
                    const path = `Rooms/${roomId}/Messages/${msgId}`;
                    const messageData: Message = {
                        msg: messageContent,
                        msgtype: msgType,
                        uid: currentUser,
                        timestamp: new Date(),
                    }
                    if (file != null) {
                        messageData.filename = file.filename;
                        messageData.filesize = file.filesize.toString();
                    }
                    this.afs.doc(path)
                        .set(messageData)
                        .then(() => console.log('message sent'))
                })
        })
    }

    getMessages(roomId: string) {
        const path = `Rooms/${roomId}/Messages`;
        this.messagesCollection = this.afs
            .collection(path, ref => { return ref.orderBy("timestamp") });

        return this.messagesCollection.valueChanges()
    }

    updateUnreadToRead(roomId: string, currentUserId: string, otherUserId: string) {
        const path = `Rooms/${roomId}`
        this.roomsDoc = this.afs.doc(path)
        this.roomsDoc.valueChanges().pipe(take(1)).subscribe(roomData => {
            const otherUnreadNo = roomData.users[otherUserId]
            let users = {};
            users[currentUserId] = 0;
            users[otherUserId] = otherUnreadNo;
            this.roomsDoc.update({ users })
        })
    }

    sendFile(roomId: string, currentUser: string, profileId: string, file: File) {
        const fileNameInStorage = Math.round(Number(formatDate(Date.now(), 'yyyyMMddhhmmssSSS', 'en-US') + (Math.random() * 10)))
        this.storage.ref(`files/${fileNameInStorage}`).put(file, { contentType: file.type }).then(() => {
            this.sendMessage(roomId, String(fileNameInStorage), currentUser, profileId, '2', { filename: file.name, filesize: file.size / 1000 })
        })
    }

    sendImg(roomId: string, currentUser: string, profileId: string, file: File) {
        const fileNameInStorage = Math.round(Number(formatDate(Date.now(), 'yyyyMMddhhmmssSSS', 'en-US') + (Math.random() * 10)))
        this.storage.ref(`filesmall/${fileNameInStorage}`).put(file, { contentType: file.type }).then(() => {
            this.sendMessage(roomId, String(fileNameInStorage), currentUser, profileId, '1', { filename: file.name, filesize: file.size / 1000 })
        })
    }

    getMessageImg(ImgName: string) {
        return this.storage.ref(`filesmall/${ImgName}`).getDownloadURL().pipe(take(1))
    }

    getFileLink(fileName: string) {
        return this.storage.ref(`files/${fileName}`).getDownloadURL().pipe(take(1))
    }

    getRooms(currentUserId: string) {
        this.roomsCollection = this.afs.collection('Rooms',
            ref => {
                return ref.where(`users.${currentUserId}`, '>=', 0)
            });
        return this.roomsCollection.valueChanges();
    }
}