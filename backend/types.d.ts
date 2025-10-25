import {Request} from "express";
import {HydratedDocument} from "mongoose";

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

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserFields>
}