import { configureStore } from "@reduxjs/toolkit";
import adminSlice from './adminSlice'
export const store= configureStore({
    reducer:{
        adminSlice
    }
})