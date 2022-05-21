import AsyncStorage from '@react-native-async-storage/async-storage';

export const DEVICE_TOKEN = 'deviceToken';
export const DEVICE_PAYLOAD = 'devicePayload';

export const saveToken = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return error;
  }
};

export const getToken = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return error;
  }
};

export const removeToken = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    return error;
  }
};
