export class UserModel {
    uid: string;
    email: string;
    fullName: string;
    photoUrl?: string;
    createdTime?: string;
    status?: string;
    notification_token_id?: string;
    userType: {
        type: string;
        gradFaculty?: string;
        gradYear?: number, specialty: string
    };
}
