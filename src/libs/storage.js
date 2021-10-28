import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  },

  async setData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log(error);
    }
  },

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
};

export default Storage;
