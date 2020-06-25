export class callNotification {
    data: {
        channelName: string;
        callerId: string;
    }
    notification: {
        title: string;
        body: string;
        image: string;
    }
}

export class emergencyNotification {
    data: {
        latitude: string;
        longitude: string;
        userId: string;
    }
    notification: {
        title: string;
        body: string;
    }
}