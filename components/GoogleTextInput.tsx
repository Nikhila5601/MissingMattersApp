import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GoogleInputProps } from '@/types/type';

const GoogleTextInput = ({
  icon,
  initialLocation,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: textInputBackgroundColor || '#FFFFFF', // Allowing dynamic background color
      shadowColor: '#D1D5DB', // shadow color equivalent to shadow-neutral-300
      shadowOffset: { width: 0, height: 2 }, // shadow-md (medium shadow)
      shadowOpacity: 0.25, // shadow opacity
      shadowRadius: 4, // shadow radius for blur
      elevation: 3, // Android shadow
      padding: 10, // padding inside the container
      flexDirection: 'row', // arranging items in a row
      alignItems: 'center', // aligning items vertically centered
    },
    text: {
      marginLeft: 10, // space between icon and text
      fontSize: 16, // text size
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
    </View>
  );
};

export default GoogleTextInput;