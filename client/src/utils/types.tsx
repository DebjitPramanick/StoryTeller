export interface UserDetailsType {
    _id?: string,
    name: string,
    email: string,
    username?: string,
    password?: string,
    bio?: string,
    avatar?: string,
    created_at?: string
}

export interface StoryDetailsType {
    _id?: string,
    title: string,
    content: string,
    tags?: string[],
    likes?: string,
    cover?: string,
    created_at?: string
}

export interface FeedDetailsType {
    _id?: string,
    title: string,
    content: string,
    tags?: string[],
    likes?: string,
    cover?: string,
    created_at?: string,
    author?: UserDetailsType
}