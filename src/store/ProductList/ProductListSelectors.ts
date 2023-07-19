import { RootState } from '..';
import { ProductListModel, AccountProductListTypes } from '../../types/ProductList';

const ProductListState = (state: RootState): ProductListModel => state.ProductListReducer;

const accountProductList = (state: RootState): AccountProductListTypes => state.ProductListReducer.response?.accountProductList;

export { ProductListState, accountProductList };