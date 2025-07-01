export interface NewsPost {
    id?: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    authorId: number;
    authorName: string;
} 