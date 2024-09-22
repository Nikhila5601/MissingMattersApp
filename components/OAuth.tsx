import { router } from 'expo-router';
import { Alert, Image, Text, View, StyleSheet } from 'react-native';

import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';
// import { googleOAuth } from '@/lib/auth';

const OAuth = () => {
//   const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleGoogleSignIn = async () => {
    // const result = await googleOAuth(startOAuthFlow);

    // if (result.code === 'session_exists') {
    //   Alert.alert('Success', 'Session exists. Redirecting to home screen.');
    //   router.replace('/(root)/(tabs)/home');
    // }

    // Alert.alert(result.success ? 'Success' : 'Error', result.message);
  };

  return (
    <View>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.separator} />
      </View>

      <CustomButton
        title="Log In with Google"
        style={styles.button}
        IconLeft={() => (
          <Image source={icons.google} resizeMode="contain" style={styles.googleIcon} />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16, // mt-4 in Tailwind is 16px
    gap: 12, // gap-x-3 in Tailwind is 12px
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB', // bg-general-100 equivalent in hex
  },
  orText: {
    fontSize: 18, // text-lg in Tailwind is 18px
  },
  button: {
    marginTop: 20, // mt-5 in Tailwind is 20px
    width: '100%',
    shadowColor: 'transparent', // shadow-none in Tailwind means no shadow
  },
  googleIcon: {
    width: 20, // w-5 in Tailwind is 20px
    height: 20, // h-5 in Tailwind is 20px
    marginHorizontal: 8, // mx-2 in Tailwind is 8px horizontal margin
  },
});

export default OAuth;
