import { setupStore } from '..';
import { act } from '@testing-library/react-native';
import { CartSlice, addToCart, removeFromCart, updateQuantity, resetCart } from './CartSlice';

const store = setupStore();

describe('CartSlice actions', () => {
  const mockCartItem = {
    id: 1,
    name: 'Test Item',
    price: 10,
    quantity: 1,
    image: 'https://example.com/test-image.jpg',
  };

  it('should add an item to the cart', () => {
    act(() => {
      store.dispatch(addToCart(mockCartItem));
    });

    const cartItems = store.getState().CartReducer.cartItems;
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0]).toEqual(mockCartItem);
  });

  it('should increment the quantity of an existing item in the cart', () => {
    act(() => {
      store.dispatch(addToCart(mockCartItem)); // Adding the same item again
    });

    const cartItems = store.getState().CartReducer.cartItems;
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].quantity).toBe(2);
  });

  it('should decrement the quantity of an item in the cart', () => {
    act(() => {
      store.dispatch(updateQuantity({ id: 1, quantity: 1 }));
    });

    const cartItems = store.getState().CartReducer.cartItems;
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].quantity).toBe(1);
  });

  it('should remove an item from the cart when the quantity is decremented to 0', () => {
    act(() => {
      store.dispatch(updateQuantity({ id: 1, quantity: 0 }));
    });

    // Dispatching the removeFromCart action again to remove the item completely
    act(() => {
      store.dispatch(removeFromCart(1));
    });

    const cartItems = store.getState().CartReducer.cartItems;
    expect(cartItems).toHaveLength(0);
  });

  it('should reset the cart', () => {
    act(() => {
      store.dispatch(addToCart(mockCartItem)); // Adding an item to the cart
    });

    act(() => {
      store.dispatch(resetCart());
    });

    const cartItems = store.getState().CartReducer.cartItems;
    expect(cartItems).toHaveLength(0);
  });
});
