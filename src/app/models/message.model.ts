// export class Message {
//     id?: string;
//     timeStamp: number;
//     senderId: string;
//     content: string;
// };

export class Message {
    msg: string;
    msgtype: string;
    timestamp: Date;
    uid: string;
    filename?: string;
    filesize?: string;
}