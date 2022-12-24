import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer: MonsterReducer } = createSlice({
    name: "monsters",
    initialState: [],
    reducers: {
        addMonster(state, action) {
            state.push(action.payload);
        },
        emptyMonsters(state, action) {
            return [];
        }
        // searchByNameNumber(state, action) {
        //     console.log(action)
        //     let tab = state.filter(ob => ob.name.toLowerCase().includes(action.payload.keywords));
        //     console.log(tab)
        //     return tab;
        // }
    }
});

export const { addMonster, emptyMonsters, searchByNameNumber } = actions;
export default MonsterReducer;