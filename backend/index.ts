import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";
import usersRouter from "./routers/users";
import recipesRouter from "./routers/recipes";
import commentsRouter from "./routers/comments";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
};

run().catch(console.error);