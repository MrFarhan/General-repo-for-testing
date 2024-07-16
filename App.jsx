import React from 'react';

import Navigations from './src/index';
import awsconfig from './aws-exports';
import { Amplify } from 'aws-amplify';
import Toast from 'react-native-toast-message';
import store from './src/store/store';
import { Provider } from 'react-redux';
import { Authenticator } from '@aws-amplify/ui-react-native';

Amplify.configure(awsconfig);

function App() {
  console.log("app")
  return (
    <Authenticator.Provider>
      <Provider store={store}>
        <Navigations />
        <Toast visibilityTime={4000} topOffset={60} />
      </Provider>
    </Authenticator.Provider>
  );
}

export default App;
