export class Thread {
    threadId: string;
    lastMsg?: string;
    timeStamp?: string;
    members: Members;
}

export class Members {
    myuid: string;
    touid: string;
}