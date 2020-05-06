export class UserModel {
    uid: string;
    email: string;
    fullname: string;
    photoUrl?: string;
    creationTime?: string;
    userType: { type: string;
                gradFaculty?: string;
                gradYear?: number, specialty: string };
};
