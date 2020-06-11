// export class Message {
//     id?: string;
//     timeStamp: number;
//     senderId: string;
//     content: string;
// };

export class Message {
    msg: string;
    msgtype: string;
    readUsers: string[];
    timestamp: number;
    uid: string;
    filename?: string;
    filesize?: string;
}