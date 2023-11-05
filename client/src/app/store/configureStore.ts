// import { createStore } from "redux";
// import counterReducer from "../../features/contact/counterReducer";
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { basketSlice } from "../../features/basket/BasketSlice";
import { catalogSlice } from "../../features/catalogue/catalogueSlice";

// export function configureStore() {
//     return createStore(counterReducer);
// }

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;