export class UserModel {
    uid: string;
    email: string;
    fullname: string;
    photoUrl?: string;
    creationTime?: string;
    status?: string;
    userType: { type: string;
                gradFaculty?: string;
                gradYear?: number, specialty: string };

    constructor(email: string, uid: string, userToken: string) {}

};
