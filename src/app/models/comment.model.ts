export class Comment {
    postId:string
    commentId?: string;
    userId: string;
    userName:string;
    content: string;
    createdTime: number;
    clappings?: object;
};