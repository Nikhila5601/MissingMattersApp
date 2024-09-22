import SliderButton from '@/components/SliderButton';
import { icons, images } from '@/constants';
import { useSignUp } from '@clerk/clerk-expo';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'; 
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';


SplashScreen.preventAutoHideAsync();

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
  });

  // Check if fonts are loaded
  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded
  } else {
    SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
  }

  const validateInput = () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return false;
    }
    return true;
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      console.log('Clerk is not loaded yet.');
      return;
    }

    if (!validateInput()) {
      return;
    }

    try {
      console.log('Creating user with Clerk...');
      const signUpResult = await signUp.create({
        emailAddress: form.email,
        username: form.username,
        password: form.password,
      });
      console.log('User created:', signUpResult);

      console.log('Preparing email verification...');
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      console.error('Error during sign-up:', JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0]?.longMessage || 'An unexpected error occurred.');
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      console.log('Clerk is not loaded yet.');
      return;
    }

    try {
      console.log('Verifying email with code:', verification.code);
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        console.log('Email verification complete.');
        await setActive({ session: completeSignUp.createdSessionId });

        setVerification({
          ...verification,
          state: 'success',
        });
        setShowSuccessModal(true);
      } else {
        console.error('Email verification failed:', completeSignUp);
        setVerification({ ...verification, error: 'Verification Failed', state: 'failed' });
      }
    } catch (err: any) {
      console.error('Error during email verification:', JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: err.errors[0]?.longMessage || 'An unexpected error occurred.',
        state: 'failed',
      });
    }
  };

  return (
    <LinearGradient
      colors={['#5A5C62', '#161719']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Please sign up to continue</Text>

        {/* Input Fields */}
        <TextInput
          placeholder="Username *"
          placeholderTextColor="#707070"
          style={styles.input}
          value={form.username}
          onChangeText={(value) => setForm({ ...form, username: value })}
        />
        <TextInput
          placeholder="Email *"
          placeholderTextColor="#707070"
          style={styles.input}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <TextInput
          placeholder="Password *"
          placeholderTextColor="#707070"
          secureTextEntry
          style={styles.input}
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />

        {/* <TouchableOpacity style={styles.signupButton} onPress={onSignUpPress}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity> */}
        <SliderButton handleSlide={onSignUpPress} title="SIGN UP" Icon={icons.Lock} />

        <Link style={{ color: '#707070', fontFamily: 'Poppins_400Regular' }} href="/sign-in">
          Already have an account? Log In
        </Link>

        <View style={styles.OrContainer}>
          <Image style={styles.Line} source={require('../../assets/images/Line.png')} />
          <Text style={styles.Or}>or</Text>
          <Image style={styles.Line} source={require('../../assets/images/Line.png')} />
        </View>

        <Text style={{ color: '#707070', fontFamily: 'Poppins_400Regular' }}>Sign up with</Text>

        {/* Social Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/images/facebook.png')} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Verification Modal */}
        <ReactNativeModal isVisible={verification.state === 'pending'}>
          <View style={styles.modalContainer}>
            <Image source={images.check} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Verification</Text>
            <Text style={styles.modalText}>We've sent a verification code to {form.email}</Text>
            <TextInput
              placeholder="Enter Code *"
              placeholderTextColor="#000"
              style={styles.inputCode}
              keyboardType="numeric"
              onChangeText={(code) => setVerification({ ...verification, code })}
            />
            {verification.error && <Text style={styles.errorText}>{verification.error}</Text>}
            <TouchableOpacity style={styles.verifyButton} onPress={onPressVerify}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View style={styles.modalContainer}>
            <Image source={images.check} style={styles.modalImage} />
            <Text style={styles.modalText}>Successfully Verified your account</Text>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => {
                router.push('/(root)/(tabs)/home');
              }}
            >
              <Text style={styles.socialButtonText}>Browse Home</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Poppins_400Regular',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 1,
    paddingLeft: 12,
    fontFamily: 'Poppins_500Medium',
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 28,
    color: '#AAAAAA',
    marginBottom: 75,
    textAlign: 'left', // Align text to the left
    fontFamily: 'Poppins_400Regular',
    width: '100%', // Ensure it takes full width to align left
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    marginBottom: 20,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  inputCode: {
    width: '95%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    marginBottom: 20,
    color: '#0a0a0a',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  signupButton: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#3A353A',
    width: '60%',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  Or: {
    marginHorizontal: 20,
    color: '#BFBBBB',
  },
  OrContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 30,
  },
  Line: {
    width: 140,
  },

  icon: {
    marginRight: 10,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
  socialButtonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3E3B3E',
    width: '45%',
    paddingVertical: 15,
    borderRadius: 5,
  },
  socialButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins_400Regular',
    marginLeft: 10,
    fontSize: 16,
  },
  socialIcon: {
    padding: 4,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  errorText: {
    // Added error text style
    color: 'red',
    marginTop: 10,
  },
});

export default SignUp;
