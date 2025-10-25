export interface User {
    _id: string;
    username: string;
    displayName: string;
    avatar: string | null;
    token: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    avatar: File | null;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface Recipe {
    _id: string;
    user: {
        _id: string;
        displayName: string;
    };
    title: string;
    recipe: string;
    image: string;
    createdAt: string;
}

export interface RecipeMutation {
    title: string;
    recipe: string;
    image: File | null;
}

export interface Comment {
    _id: string;
    user: {
        _id: string;
        displayName: string;
        avatar: string | null;
    };
    recipe: string;
    text: string;
    createdAt: string;
}

export interface CommentMutation {
    recipe: string;
    text: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            message: string;
            name: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}