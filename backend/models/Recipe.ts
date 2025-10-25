import mongoose from "mongoose";
import {RecipeFields} from "../types";
import User from "./User";

const Schema = mongoose.Schema;

const RecipeSchema = new Schema<RecipeFields>({
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
    title: {
        type: String,
        required: true,
        trim: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;