import * as SecureStore from 'expo-secure-store';

interface CustomStorage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

const customStorage: CustomStorage = {
  getItem: async (key: string) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value !== null ? value : null;
    } catch (error) {
      console.error('Error getting data from secure store:', error);
      return null;
    }
  },

  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error setting data in secure store:', error);
    }
  },

  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing data from secure store:', error);
    }
  },
};

export default customStorage;
