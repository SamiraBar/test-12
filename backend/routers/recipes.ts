import express from "express";
import {imagesUpload} from "../multer";
import Recipe from "../models/Recipe";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import {RequestWithUser} from "../types";
import Comment from "../models/Comment";

const recipesRouter = express.Router();

recipesRouter.get('/', async (req, res, next) => {
    try {
        const recipes = await Recipe
            .find()
            .populate('user', 'displayName')
            .sort({ createdAt: -1 });

        res.send(recipes);
    } catch (error) {
        next(error);
    }
});

recipesRouter.get('/user/:userId', async (req, res, next) => {
    try {
        const recipes = await Recipe
            .find({ user: req.params.userId })
            .populate('user', 'displayName')
            .sort({ createdAt: -1 });

        res.send(recipes);
    } catch (error) {
        next(error);
    }
});

recipesRouter.get('/:id', async (req, res, next) => {
    try {
        const recipe = await Recipe
            .findById(req.params.id)
            .populate('user', 'displayName');

        if (!recipe) {
            return res.status(404).send({error: 'Recipe not found'});
        }

        res.send(recipe);
    } catch (error) {
        next(error);
    }
});

recipesRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!req.body.title || !req.body.recipe) {
            return res.status(400).send({error: 'Title and recipe are required'});
        }

        if (!req.file) {
            return res.status(400).send({error: 'Image is required'});
        }

        const recipe = await Recipe.create({
            user: user._id,
            title: req.body.title,
            recipe: req.body.recipe,
            image: req.file.filename,
        });

        res.send(recipe);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({error: error.message});
        }
        next(error);
    }
});

recipesRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).send({error: 'Recipe not found'});
        }

        const isOwner = recipe.user.toString() === user._id.toString();

        if (!isOwner) {
            return res.status(403).send({error: 'You do not have permission to delete this recipe'});
        }

        await Comment.deleteMany({recipe: req.params.id});

        await Recipe.deleteOne({_id: req.params.id});

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default recipesRouter;