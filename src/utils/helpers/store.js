import AsyncStorage from '@react-native-async-storage/async-storage';

class Store {
  // Persisting data:
  set = async (key, value, storeObject = false) => {
    try {
      let newValue = value;
      if (storeObject) {
        newValue = JSON.stringify(value);
      }
      await AsyncStorage.setItem(key, newValue);
      return true;
    } catch (error) {
      // Error saving data
      return false;
    }
  };

  // Fetching data:
  get = async (key, getObject = false) => {
    try {
      let value = await AsyncStorage.getItem(key);
      if (getObject) {
        value = value !== null ? JSON.parse(value) : null;
      }
      return value;
    } catch (error) {
      // Error retrieving data
      return error;
    }
  };

  // Removing data:
  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      // Error retrieving data
      return false;
    }
  };
}

export default new Store();
