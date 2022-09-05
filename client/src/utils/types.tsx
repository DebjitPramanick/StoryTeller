export interface GlobalUserType {
    _id: string,
    name: string,
    email: string,
    username: string,
    password: string,
    bio: string,
    avatar: string,
    country: string,
    dob: string,
    gender: 'M' | 'F' | 'T',
    created_at: string
}

export interface FeedDetailsType {
    _id: string,
    title: string,
    content: string,
    tags: string[],
    cover: string,
    created_at: string,
    author: GlobalUserType
}