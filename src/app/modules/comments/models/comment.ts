export interface IComment {
    id: string,
    name: string,
    comment_text: string,
    comment_on: string,
    is_deleted: boolean,
    replies: any[]
}

export interface IFormValue {
    id: string,
    name: string,
    comment_text: string,
    type: 'comment' | 'reply',
    action: string,
    comment?: IComment
}