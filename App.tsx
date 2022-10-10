
import React from 'react';
import { Alert, StyleSheet,  View, Button } from 'react-native';
import useBLE from './useBLE';


export default function App() {


  const { requestPermissions } = useBLE();



  const openModal = async () => {
    requestPermissions((isGranted) => {
      Alert.alert('The Android Permission id Granted?' + isGranted);
    });
    
  }


  return (
      <View style={styles.container}>
      <Button
        onPress={openModal}
        title="Connect"
        color="#841584"
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
