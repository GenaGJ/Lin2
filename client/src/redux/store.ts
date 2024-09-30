import { configureStore } from "@reduxjs/toolkit";
import { UseDispatch, useDispatch } from "react-redux";
import authSlice from "../features/auth/authSlice";
import serversSlice from "../features/servers/serversSlice";


export const store = configureStore ({
    reducer :{
        auth: authSlice,
     servers:serversSlice,
    }
} )

export type RootState = ReturnType<typeof store.getState>

export type AppDispatsh = typeof store.dispatch

export const useAppDispatch: () => AppDispatsh = useDispatch
