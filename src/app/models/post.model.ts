export class Post {
    postKey?: string;
    userID: string;
    userName:string;
    title: string;
    description: string;
    category: string;
    createdTime: number;
    postPhoto?: string;
    upVotes?: object;
    commentCounter:number;
    upVotesCounter:number;
};