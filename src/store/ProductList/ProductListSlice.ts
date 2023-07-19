import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductListModel, Product } from '../../types/ProductList';

const initialState: ProductListModel = {
  response: null,
  isLoading: false,
  error: '',
};

const ProductListSlice = createSlice({
  name: 'ProductList',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProductListSuccess: (state, action: PayloadAction<Product[]>) => {
      console.log(action.payload, 'action.payload.');
      state.response = action.payload;
      state.error = '';
    },
    setProductListFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default ProductListSlice;
