import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import ProductList from '../screens/ProductList';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupStore } from '../store/index';

const store = setupStore();
const queryClient = new QueryClient();
  

describe('ProductList', () => {
  const ProductListComp = () => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <ProductList navigation={{ setOptions: jest.fn() }} />
      </QueryClientProvider>
    </Provider>
  );


  it('should render without crashing', () => {
    const { getByTestId } = render(<ProductListComp />);
    const test = getByTestId('productList');
    expect(test).toBeTruthy();
  });

  it('should display product information correctly', () => {
    const mockProducts = [
      // Your mock product data
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        img: 'https://example.com/product1.jpg',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 15,
        img: 'https://example.com/product2.jpg',
      },
    ];

    // Mock the useSelector function to return mockProducts
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue({
      cartItems: [], // Mock empty cartItems
      response: mockProducts,
    });

    const { getByTestId } = render(<ProductListComp />);

    // Your test case logic to check if product information is displayed correctly
    mockProducts.forEach((product) => {
      const productContainer = getByTestId(`product-${product.id}`);
      const productName = getByTestId(`product-name-${product.id}`);
      const productPrice = getByTestId(`product-price-${product.id}`);
      const productImage = getByTestId(`product-image-${product.id}`);
      expect(productContainer).toBeTruthy();
      expect(productName).toHaveTextContent(product.name);
      expect(productPrice).toHaveTextContent(`Price: $${product.price}`);
      expect(productImage).toBeTruthy();
    });
  });



});
