// ProductList.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import ProductList from '../screens/ProductList';
import { addToCart, removeFromCart, updateQuantity } from '../store/ProductList/CartSlice';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import useProductListApi from '../services/hooks/useProductListApi';

jest.mock('react-redux');
jest.mock('../services/hooks/useProductListApi');

const mockDispatch = jest.fn();
const mockCartItems = [];
const mockProducts = [
  {
    id: 1,
    colour: 'Red',
    name: 'Product 1',
    price: 10,
    img: 'https://example.com/product1.jpg',
  },
  {
    id: 2,
    colour: 'Blue',
    name: 'Product 2',
    price: 15,
    img: 'https://example.com/product2.jpg',
  },
];

describe('ProductList', () => {
  beforeEach(() => {
    // Reset the mock state before each test
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({
        CartReducer: { cartItems: mockCartItems },
        ProductListReducer: { response: mockProducts },
      } as RootState)
    );
    useProductListApi.mockReturnValue({});
  });

  it('should render product list correctly', () => {
    const mockNavigation = {
      setOptions: jest.fn(),
      navigate: jest.fn(),
    };

    const { getByTestId } = render(<ProductList navigation={mockNavigation} />);
    const productList = getByTestId('productList');

    expect(productList).toBeTruthy();
  });


  it('should add products to the cart correctly', () => {
    const mockNavigation = {
      setOptions: jest.fn(),
      navigate: jest.fn(),
    };

    const { getByTestId } = render(<ProductList navigation={mockNavigation} />);
    const addToCartButton = getByTestId('add-to-cart-button-1');

    fireEvent.press(addToCartButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      addToCart({
        id: 1,
        name: 'Product 1',
        price: 10,
        quantity: 1,
        image: 'https://example.com/product1.jpg',
      })
    );
  });


});
