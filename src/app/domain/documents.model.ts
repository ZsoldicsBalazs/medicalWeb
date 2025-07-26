export interface Document{
    id?: number, // Optional for backward compatibility
    fileName: string,
    uploadDate: Date,
    fileUrl: string
}