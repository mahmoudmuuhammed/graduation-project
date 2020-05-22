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

                constructor(private userEmail: string, private userId, private tokenID: string) { }
};
