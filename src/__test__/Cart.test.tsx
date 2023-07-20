// File: Cart.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Cart from '../screens/Cart';
import { useNavigation as mockUseNavigation } from '@react-navigation/native'; // Import the original useNavigation
import { setupStore } from '../store/index';

jest.mock('@react-navigation/native'); // Mock the entire module

const store = setupStore();

describe('Cart', () => {
  beforeEach(() => {
    mockUseNavigation.mockReturnValue({
      navigate: jest.fn(),
    });
  });

  const CartComp = () => (
    <Provider store={store}>
      <Cart />
    </Provider>
  );

  it('should render without crashing', () => {
    const { getByTestId } = render(<CartComp />);
    const test = getByTestId('cart');
    expect(test).toBeTruthy();
  });
});
