import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UrlInterface } from "../interfaces/url.interface";

const initialState: UrlInterface ={
    fullUrl: undefined,
    shortCode: undefined,
    expiry: undefined,
    numberOfHits: undefined
}

const urlSlice = createSlice({
    name: 'url',
    initialState: initialState,
    reducers: {
        selectUrl: (state, action: PayloadAction<UrlInterface>) => {
            state = action.payload;
        }
    }
})

export const { selectUrl } = urlSlice.actions;

export default urlSlice.reducer;