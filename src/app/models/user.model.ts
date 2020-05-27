export class UserModel {
    uid: string;
    email: string;
    fullName: string;
    photoUrl?: string;
    createdTime?: string;
    status?: string;
    userType: AccountType;
    notification_token_id?: string;
};

export class AccountType {
    usertype: string;
    gradFaculty?: string;
    gradYear?: string;
    specialty?: string;
}
