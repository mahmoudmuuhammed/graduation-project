export class UserModel {
    uid: string;
    email: string;
    fullName: string;
    photoUrl?: string;
    creationTime?: string;
    status?: string;
    userType: AccountType;
};

export class AccountType {
    usertype: string;
    gradFaculty?: string;
    gradYear?: string;
    specialty?: string;
}
