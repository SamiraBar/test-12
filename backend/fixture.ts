import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Recipe from "./models/Recipe";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('recipes');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [user1, user2] = await User.create({
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

    const [recipe1, recipe2, recipe3] = await Recipe.create({
        user: user1._id,
        title: 'Плов',
        recipe: 'Нарежьте мясо кубиками. Обжарьте лук до золотистого цвета. Добавьте мясо и жарьте до румяной корочки. Добавьте морковь соломкой, специи. Залейте водой, добавьте рис. Варите под крышкой 40 минут.',
        image: 'fixtures/plov.jpg',
    }, {
        user: user1._id,
        title: 'Лагман',
        recipe: 'Отварите лапшу. Обжарьте мясо с овощами (перец, лук, морковь). Добавьте томатную пасту, специи. Тушите 30 минут. Подавайте мясо с овощами на лапше.',
        image: 'fixtures/lagman.jpg',
    }, {
        user: user2._id,
        title: 'Борщ',
        recipe: 'Сварите бульон из мяса. Добавьте нарезанный картофель. Обжарьте лук, морковь, свеклу. Добавьте в бульон. Добавьте капусту, томатную пасту. Варите до готовности овощей.',
        image: 'fixtures/borsch.jpg',
    });

    await db.close();
};

run().catch(console.error);