import GoogleTextInput from '@/components/GoogleTextInput';
import { icons } from '@/constants';
import { useDriverStore, useLocationStore } from '@/store';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { calculateRegion } from '@/lib/map';

const Map = () => {
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  const [hasPermissions, setHasPermissions] = useState(false);

  const handleDestination = () => {
    // Add logic to handle destination search
  };

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setHasPermissions(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0]?.name}, ${address[0]?.region}`,
      });

      setHasPermissions(true);
    };

    requestLocation();
  }, [setUserLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        showsPointsOfInterest={false}
        showsUserLocation={true}
        initialRegion={region}
        userInterfaceStyle="light"
      >
        <Marker coordinate={region} title="Your Location" />
      </MapView>
      <View style={styles.searchContainer}>
        <GoogleTextInput icon={icons.search} handlePress={handleDestination} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 30,
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    borderRadius: 30, // Add border radius
    backgroundColor: '#D0C5BB', // Background color for the search input
    padding: 10, // Padding around the search input
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.5, // Shadow radius
    elevation: 5, // For Android shadow
    zIndex: 1, // Ensures the input is above the map
  },
});

export default Map;
