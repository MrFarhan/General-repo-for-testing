import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loader = ({text}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', marginTop: '50%'}}>
      <ActivityIndicator size={55} />
      {text && <Text style={{textAlign: 'center'}}>{text}</Text>}
    </View>
  );
};

export default Loader;
