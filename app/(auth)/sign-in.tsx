import { useSignIn } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SliderButton from '@/components/SliderButton';
import { icons, images } from '@/constants';
import { ALERT_TYPE, Toast, AlertNotificationRoot } from 'react-native-alert-notification';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Clerk authentication hooks
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      console.log('Clerk is not loaded yet.');
      return;
    }

    try {
      // Attempt to sign in with email and password
      const signInAttempt = await signIn.create({
        identifier: form.email, // Email or identifier
        password: form.password, // Password
      });

      // If the sign-in is complete, set the session and navigate to home
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        console.log('Sign in successful');
        router.replace('/(root)/(tabs)/home'); // Route to home page

        // Show success toast notification
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'You have successfully logged in!',
        });
      } else {
        // Handle other statuses such as pending verifications
        console.error('Sign-in not complete:', JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // Log and show a toast notification if login fails
      console.error('Sign-in error:', JSON.stringify(err, null, 2));

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Login failed. Please check your credentials.',
      });
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <AlertNotificationRoot>
      <LinearGradient
        colors={['#5A5C62', '#161719']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to your account</Text>
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

          <SliderButton handleSlide={onSignInPress} title="LOG IN" Icon={icons.Login} />

          <Link style={{ color: '#707070', fontFamily: 'Poppins_400Regular' }} href="/sign-up">
            New user? Sign Up
          </Link>

          <View style={styles.OrContainer}>
            <Image style={styles.Line} source={require('../../assets/images/Line.png')} />
            <Text style={styles.Or}>or</Text>
            <Image style={styles.Line} source={require('../../assets/images/Line.png')} />
          </View>

          <Text style={{ color: '#707070', fontFamily: 'Poppins_400Regular' }}>Login using</Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../assets/images/facebook.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </AlertNotificationRoot>
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
    marginBottom: 100,
    textAlign: 'left',
    fontFamily: 'Poppins_400Regular',
    width: '100%',
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
});

export default SignIn;
