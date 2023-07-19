import { ThunkAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { RootState } from '..';
import ProductListSlice from './ProductListSlice';
import ApiClient from '../../services/ApiClient';

export const ProductListActions = ProductListSlice.actions;

export const fetchProductList = (token?: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            };
        
            const response = await ApiClient.get('/Account/ProductList', config);
            dispatch(ProductListActions.setProductListSuccess(response.data));
            return response;
          } catch (error: any) {
            let errorMessage;
            if (error?.message) {
              errorMessage = error.message;
            } else {
              errorMessage = error.response?.data[0]?.errorMessage || 'Bad Request';
            }
            dispatch(ProductListActions.setProductListFailed(errorMessage));
            return Promise.reject(errorMessage);
          }
    };
};