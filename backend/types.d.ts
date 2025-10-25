import {Request} from "express";
import {HydratedDocument, Types} from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string;
    avatar: string | null;
    googleId?: string;
}

export interface RecipeFields {
    user: Types.ObjectId;
    title: string;
    recipe: string;
    image: string;
}

export interface CommentFields {
    user: Types.ObjectId;
    recipe: Types.ObjectId;
    text: string;
}

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserFields>
}