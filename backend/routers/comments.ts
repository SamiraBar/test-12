import express from "express";
import Comment from "../models/Comment";
import Recipe from "../models/Recipe";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import {RequestWithUser} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    try {
        if (!req.query.recipe) {
            return res.status(400).send({error: 'Recipe ID is required'})
        }

        const comments = await Comment
            .find({ recipe: req.query.recipe })
            .populate('user', 'displayName avatar')
            .sort({ createdAt: -1 });

        res.send(comments);
    } catch (error) {
        next(error)
    }
});

commentsRouter.post('/', async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!req.body.recipe || !req.body.text) {
            return res.status(400).send({error: 'Recipe ID is required'})
        }

        const comment = await Comment.create({
            user: user._id,
            recipe: req.body.recipe,
            text: req.body.text,
        });

        const populatedComment  = await Comment
            .findById(comment._id)
            .populate('user', 'displayName avatar')

        res.send(populatedComment);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({error: error.message})
        }
        next(error);
    }
});

commentsRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).send({error: 'Comment not found'});
        }

        const isCommentAuthor = comment.user.toString() === user._id.toString();

        const recipe = await Recipe.findById(comment.recipe);
        const isRecipeAuthor = recipe && recipe.user.toString() === user._id.toString();

        if (!isCommentAuthor && !isRecipeAuthor) {
            return res.status(403).send({error: 'You do not have permission to delete this comment'});
        }

        await Comment.deleteOne({_id: req.params.id});
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default commentsRouter;