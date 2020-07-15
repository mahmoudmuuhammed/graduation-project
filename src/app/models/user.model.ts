export class UserModel {
    uid: string;
    email: string;
    fullName: string;
    createdTime?: number;
    status?: string;
    userType: AccountType;
    notification_token_id?: string;
    clappingCounter?: number;
    commentCounter?: number;
    postCounter?: number;
    trusted?: [];
};

export class AccountType {
    usertype: string;
    gradFaculty?: string;
    gradYear?: string;
    speciality?: string;
    location?: string;
    fees?: number;
}
