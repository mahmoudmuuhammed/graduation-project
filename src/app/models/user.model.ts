export class UserModel {
    uid: string;
    email: string;
    fullname: string;
    photoUrl?: string;
    creationTime?: string;
    status?: string;
    accountType: AccountType;
    constructor(email: string, uid: string, userToken: string) {}

};

export class AccountType {
    usertype: string;
    gradFaculty?: string;
    gradYear?: string;
    specialty?: string;
}
