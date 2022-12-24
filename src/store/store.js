import { configureStore } from "@reduxjs/toolkit";
import MonsterReducer from "./monsters.slice";
const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
        monsters: MonsterReducer
    }
});
export default store;