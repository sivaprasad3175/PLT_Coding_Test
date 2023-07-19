import { combineReducers } from 'redux';
import ProductListReducer from './ProductList/ProductListSlice';
import CartReducer from "./ProductList/CartSlice";

export const rootReducer = combineReducers({
  ProductListReducer: ProductListReducer.reducer,
  CartReducer:CartReducer.reducer
});
