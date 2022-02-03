import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import UserReducer from "./reducers/user";
import ProductReducer from "./reducers/products";
import OrderReducer from "./reducers/orders";

const persistConfig = {
    key: "primary",
    storage,
    whitelist: [],
    // whitelist: ["user"],
  };
  
  const rootReducer = combineReducers({
    user: UserReducer,
    product: ProductReducer,
    order: OrderReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = createStore(persistedReducer);
  export const persistor = persistStore(store);
  