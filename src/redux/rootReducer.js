// rootReducer.js
import { combineReducers } from "redux";
import modalReducer from "./modalSlice";
import dataSlice from "./dataSlice";
import productSlice from "./productSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  orders: dataSlice,
  productData: productSlice,
  // other reducers go here if you have any
});

export default rootReducer;
