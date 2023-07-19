import { useQuery } from '@tanstack/react-query';
import ApiClient from '../ApiClient';
import { useAppDispatch } from '../../hooks/reduxhooks';
import { ProductListActions } from '../../store/ProductList/ProductListAction';

export default function useProductListApi(): any {
  const dispatch = useAppDispatch();


  const ProductList = async (): Promise<any> => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await ApiClient.get('products/products', config);
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

  return useQuery(['ProductList'], () => ProductList());
}
