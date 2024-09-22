import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BGround from '../../assets/images/OnboardingBackGround.png'; // Importing image correctly
import { icons } from '@/constants';
// Get device screen width and height
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  // Animated value for slide transition
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Slide animation function
  const animateSlide = (toValue) => {
    Animated.timing(slideAnim, {
      toValue, // Correctly use the 'toValue' parameter
      duration: 300, // Duration of the animation
      useNativeDriver: true,
    }).start();
  };


  useEffect(() => {
    animateSlide(-activeIndex * screenWidth); // Initialize the slide animation
  }, [activeIndex]);
  
  const handleNextPress = () => {
    if (isLastSlide) {
      router.replace('/(auth)/sign-up');
    } else {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      animateSlide(-nextIndex * screenWidth); // Animate to the next slide
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          router.replace('/(auth)/sign-in');
        }}
        style={{ position:'absolute' }} // Added zIndex
      >
        <Text>Skip</Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: screenWidth * onboarding.length, // Total width based on number of slides
          transform: [{ translateX: slideAnim }], // Slide animation
        }}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            style={{
              width: screenWidth, // Each slide takes up full screen width
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageBackground
              source={BGround} // Use the imported image directly
              style={{ width: screenWidth, height: screenHeight+120 }} // Fullscreen background image
              resizeMode='cover'
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  position: 'relative',
                  bottom: 180,
                  paddingLeft:20,
                  alignItems: 'flex-start',
                  paddingBottom: 100,
                  
                }}
              >
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </Animated.View>
      <View style={styles.ButtonContainer}>
        <CustomButton
          textVariant="primary" Icon={icons.Circle}
          title={isLastSlide ? 'DROP INTO THE BOX' : 'GET STARTED'}
          onPress={handleNextPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ButtonContainer: {
    marginBottom: 20,
    margin: 'auto',
  },
  titleText: {
    fontSize: 50,
    height:210,
    color: '#ECE8E4', 
    fontFamily: 'Inter', // font-['Inter']
    textShadowColor: 'rgba(0, 0, 0, 0.84)', // shadow color
    textShadowOffset: { width: 5, height: 2 }, // shadow-x: 5px, shadow-y: 2px
    textShadowRadius: 4, // shadow blur: 4px
    width:280
  },
});

export default Welcome;
