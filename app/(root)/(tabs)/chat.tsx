import SliderButton from '@/components/SliderButton';
import { images } from '@/constants';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Chat = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle barcode scanning event
  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    console.log(`Scanned URL: ${data}`);

    Alert.alert('Scanned!', `Scanned URL: ${data}`, [
      { text: 'OK', onPress: () => setScanned(false) },
    ]);

    // Validate if the scanned data is a URL before trying to open it
    if (data && data.startsWith('http')) {
      Linking.openURL(data).catch((err) => console.error('An error occurred', err));
    } else {
      Alert.alert('Error', 'Scanned data is not a valid URL.');
    }
  };

  // Handle permission state
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // If fonts are not loaded yet, show a loading indicator
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ color: '#FFFFFF' }}>Loading Fonts...</Text>
      </View>
    );
  }

  const handleChat = () => {
    console.log('Handle chat button press');
  };

  return (
    <View style={styles.container}>
      {/* Header and Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Image source={images.BackArrow} />
      </TouchableOpacity>

      {/* Main Content */}
      <Text style={styles.mainTitle}>Scan</Text>
      <Text style={styles.subtitle}>QR Code</Text>

      {/* QR Code Scanner */}
      <View style={styles.scannerBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>

      {/* Bottom Information and Button */}
      <Text style={styles.infoText}>Found or Lost Items?{'\n'}</Text>
      <Text style={styles.infoText2}>Scan the QR</Text>

      <SliderButton handleSlide={handleChat} title="Chat" Icon={images.Chat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242529',
    alignItems: 'center',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  mainTitle: {
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: 60,
    textAlign: 'left',
    fontFamily: 'Poppins_300Light',
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  subtitle: {
    fontSize: 38,
    fontFamily: 'Poppins_400Regular',
    color: '#E8DCD0',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  scannerBox: {
    width: 260,
    height: 260,
    borderColor: '#E8DCD0',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
  },
  scanner: {
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 350,
  },
  infoText: {
    fontSize: 20,
    color: '#C0C0C0',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  infoText2: {
    marginBottom: 20,
    fontSize: 20,
    color: '#C0C0C0',
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242529',
  },
});

export default Chat;
