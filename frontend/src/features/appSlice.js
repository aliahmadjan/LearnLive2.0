import {createSlice} from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState:{
        roomId: null,
    },
    reducers:{

        enterChannel: (state,action) =>
        {
            state.roomId = action.payload.roomId;
        },

    },
});

export const { enterChannel} = appSlice.actions;

export const selectRoomId = state => state.app.roomId;

export default appSlice.reducer;