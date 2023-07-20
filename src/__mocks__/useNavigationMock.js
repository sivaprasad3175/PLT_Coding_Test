// File: useNavigationMock.js
import { useNavigation as originalUseNavigation } from '@react-navigation/native';

export function useNavigation() {
  return {
    navigate: jest.fn(),
    // Add any other navigation methods you need for testing
  };
}
