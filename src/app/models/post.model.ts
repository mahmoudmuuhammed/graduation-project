export class Post {
    postId?: string;
    authorId: string;
    title: string;
    description: string;
    category: string;
    creationTime: number;
    postImgUrl?: string;
    upvotes?: object;
};