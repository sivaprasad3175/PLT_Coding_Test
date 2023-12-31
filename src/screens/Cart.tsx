import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { resetCart, updateQuantity, removeFromCart ,removeProductFromCart} from '../store/ProductList/CartSlice';

import { useNavigation } from '@react-navigation/native';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state: RootState) => state.CartReducer.cartItems);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    } else {
      // Remove the item from the cart if the quantity is 0
      handleRemoveItem(itemId);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeProductFromCart(itemId));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>Price: ${item.price}</Text>
        <View style={styles.cartItemActions}>
          <TouchableOpacity
            style={styles.cartItemActionButton}
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.cartItemActionButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.cartItemActionButton}
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.cartItemActionButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartItemActionButton}
            onPress={() => handleRemoveItem(item.id)}
          >
            <Text style={styles.cartItemActionButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleCheckout = () => {
    // Dispatch the action to reset the cart state
    Alert.alert('Shopping Completed', 'Thank you for shopping!', [
      {
        text: 'OK', onPress: () => {
          dispatch(resetCart());
          navigation.navigate('ProductList');
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} testID='cart'>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.checkoutContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  cartItemQuantity: {
    fontSize: 16,
    marginRight: 5,
    padding:5
  },
  cartItemActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cartItemActionButton: {
    backgroundColor: '#dddddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  cartItemActionButtonText: {
    fontSize: 16,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;
