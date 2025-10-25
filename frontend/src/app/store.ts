import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice.ts';
import { recipesReducer } from '../features/recipes/recipesSlice.ts';
import { commentsReducer } from '../features/comments/commentsSlice.ts';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

const userPersistConfig = {
    key: 'recipe-place:users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    users: persistReducer(userPersistConfig, usersReducer),
    recipes: recipesReducer,
    comments: commentsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;