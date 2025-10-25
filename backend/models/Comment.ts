import mongoose from "mongoose";
import {CommentFields} from "../types";
import User from "./User";
import Recipe from "./Recipe";

const Schema = mongoose.Schema;

const CommentSchema = new Schema<CommentFields>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist'
        }
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
                const recipe = await Recipe.findById(value);
                return Boolean(recipe);
            },
            message: 'Recipe does not exist'
        }
    },
    text: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;