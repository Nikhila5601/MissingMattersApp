import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  ImageSourcePropType,
  StyleSheet,
  View,
  Image,
} from 'react-native'; // Add Dimensions import here
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  useFonts,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import InsetShadow from 'react-native-inset-shadow';
import SlideButton from 'rn-slide-button';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

// Define the prop types
interface SliderButtonProps {
  handleSlide: (event?: GestureResponderEvent) => void; // Explicit type for handleSlide
  title: string; // Title should be a string
  Icon: ImageSourcePropType | React.ReactNode; // Icon can be an image source or a React node
}

const { width } = Dimensions.get('window');

const SliderButton: React.FC<SliderButtonProps> = ({ handleSlide, title, Icon }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
  });

  // Hide splash screen once fonts are loaded
  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null if fonts are not loaded yet
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ height: 120 }}>
      <View style={styles.container}>
        {/* Inset shadow effect with the InsetShadow component */}
        <InsetShadow
          shadowOpacity={0.8}
          shadowColor="rgba(0, 0, 0, 0.6)"
          containerStyle={styles.insetShadowContainer}
          shadowOffset={{ width: 3, height: 4 }}
          elevation={5}
          shadowRadius={4}
        >
          <SlideButton
            height={60}
            completeThreshold={80}
            width={width * 0.7}
            padding={7}
            onSlideEnd={handleSlide} // The function passed down as a prop
            containerStyle={styles.slideComponent} // Container style with background color
            title={title} // The title passed down as a prop
            titleStyle={styles.slideText} // Text style
            icon={
              typeof Icon === 'object' ? (
                Icon
              ) : (
                <Image source={Icon as ImageSourcePropType} style={{ width: 24, height: 24 }} />
              )
            } // Properly handle Icon rendering
            thumbStyle={styles.slider} // Style for the slider handle with shadow
            underlayStyle={styles.filledArea} // Use this style for the filled area when sliding
            renderSlider={() => (
              <LinearGradient
                colors={['#E8DCD0', '#827B75']} // The gradient colors
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientSlider} // Apply gradient styles
              />
            )}
          />
        </InsetShadow>
      </View>
    </GestureHandlerRootView>
  );
};

export default SliderButton;

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insetShadowContainer: {
    backgroundColor: '#363036',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.7,
  },
  slideComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#363036',
  },
  slider: {
    padding: 0,
    margin: 0,
    borderRadius: 50,
    backgroundColor: '#E8DCD0', // Slider handle background color
    // Drop shadow for the thumb
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 4 }, // X: 3, Y: 4
    shadowOpacity: 0.3,
    shadowRadius: 4, // Blur: 4
    elevation: 5, // Elevation for Android shadow
  },
  gradientSlider: {
    flex: 1,
    borderRadius: 50, // Ensure rounded gradient slider
  },
  slideText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    width: 150,
  },
  filledArea: {
    backgroundColor: '#363036', // Change the fill color when sliding
  },
});
