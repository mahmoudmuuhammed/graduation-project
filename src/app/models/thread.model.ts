export class Thread {
    threadId: string;
    lastMsg?: string;
    timeStamp?: string;
    members: object;
};

export class Members {
    myuid: string;
    touid: string;
};