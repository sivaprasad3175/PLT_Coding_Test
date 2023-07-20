import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../store/ProductList/CartSlice';
import CartIcon from '../assets/images/CartIcon';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import useProductListApi from '../services/hooks/useProductListApi';

interface Props {
  navigation?: StackNavigationProp<any>;
}

interface Product {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
}

const ProductList: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.CartReducer.cartItems);
  useProductListApi()
  const products = useSelector((state: RootState) => state.ProductListReducer.response);
  const handleAddToCart = (item: Product) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image:item.img
      })
    );
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
  };


  const renderItem = ({ item }: { item: Product }) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);

    return (
      <View style={styles.productContainer} testID={`product-${item.id}`}>
        <Image source={{ uri: item.img }} style={styles.productImage} testID={`product-image-${item.id}`} />
        <Text style={styles.productName} numberOfLines={2} testID={`product-name-${item.id}`}>
          {item.name}
        </Text>
        <Text style={styles.productPrice} testID={`product-price-${item.id}`}>
          Price: ${item.price}
        </Text>
        {cartItem ? (
          <View style={styles.cartControls}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFromCart(item.id)}
              testID={`remove-button-${item.id}`}
            >
              <Text style={styles.cartButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.cartQuantity} testID={`cart-quantity-${item.id}`}>
              {cartItem.quantity}
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleUpdateQuantity(item.id, cartItem.quantity + 1)}
              testID={`add-button-${item.id}`}
            >
              <Text style={styles.cartButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
            testID={`add-to-cart-button-${item.id}`}
          >
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };


  useEffect(() => {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <CartIcon width={24} height={24} color="black" />
            {totalQuantity > 0 && (
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{totalQuantity}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, cartItems]);



  return (
    <View style={styles.container} testID='productList'>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Set the number of columns in the grid
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  productContainer: {
    flex: 0.5, // Take half of the container width to create a 2-column grid
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cartCount: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  headerRightContainer: {
    marginRight: 15,
  },
  cartCountBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },

 
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#888888',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cartQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    padding:5
    ,textAlign:'center'
  },
  removeButton: {
    

    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

});

export default ProductList;
