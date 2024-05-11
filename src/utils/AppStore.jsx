import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice'
import UserReducer from './UserSlice'
const AppStore = configureStore({
    reducer:{
        cart: cartReducer,
        user:UserReducer,
    }
})

export default AppStore