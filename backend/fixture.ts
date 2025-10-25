import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    await User.create({
        username: 'user1',
        password: 'user1',
        token: randomUUID(),
        displayName: 'Иван',
        avatar: 'fixtures/user-one-avatar.jpg',
    }, {
        username: 'user2',
        password: 'user2',
        token: randomUUID(),
        displayName: 'Петя',
        avatar: 'fixtures/user-two-avatar.jpg',
    });

    await db.close();
};

run().catch(console.error);