import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

export const customAxios = async (url, method, data = null, token = null) => {
  const API_URL = ""
  let options = {
    method: method,
    url: `${API_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  if (data) {
    options.body = data;
  }
  if (!token) {
    delete options.headers.Authorization;
  }

  return await axios(options);
};

let ref1;
let lastTime1;
export const debounce = (func, timer1) => {
  if (ref1) {
    clearTimeout(ref1);
    ref1 = null;
    timer1 = lastTime1 - Date.now();
  }
  ref1 = setTimeout(() => {
    func();
    lastTime1 = 0;
    ref1 = null;
  }, timer1);
  lastTime1 = Date.now() + timer1;
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return { success: true, message: 'Location permission granted' };
    }
    return { success: false, message: 'Location permission denied' };
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return { success: true, message: 'Location permission granted' };
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return { success: true, message: 'Location permission granted' };
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    return { success: false, message: 'Location permission denied by user.' };
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    return { success: false, message: 'Location permission denied by user.' };
  }

  return false;
};
