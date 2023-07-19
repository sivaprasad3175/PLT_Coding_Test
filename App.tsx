
import React, { useState, FC, useEffect } from 'react';
import {

  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from './src/screens/ProductList';
import Cart from './src/screens/Cart';
import { Provider } from 'react-redux';

import { setupStore } from './src/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';


const Stack = createStackNavigator();


const App: FC = () => {

  const queryClient = new QueryClient();
  const store = setupStore();
  const persistor = persistStore(store);



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer >
          <QueryClientProvider client={queryClient}>
            <Stack.Navigator initialRouteName={'ProductList'}>
              <Stack.Screen
                name="ProductList" component={ProductList}
                options={{ headerShown: true }}
              />
              <Stack.Screen name="Cart" component={Cart}
                options={{ headerShown: true }}
              />
            </Stack.Navigator>
          </QueryClientProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
};

export default App;


