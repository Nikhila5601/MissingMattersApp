import { icons } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient'; // Correct import from Expo
import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

const TabIcon = ({ source, focused }: { source: ImageSourcePropType; focused: boolean }) => (
  <View style={styles.iconWrapper}>
    {focused ? (
      <LinearGradient colors={['#E8DCD0', '#827B75']} style={styles.iconContainer}>
        <Image source={source} tintColor='#333333' resizeMode="contain" style={styles.iconImage} />
      </LinearGradient>
    ) : (
      <View style={styles.iconContainer}>
        <Image source={source} tintColor="white" resizeMode="contain" style={styles.iconImage} />
      </View>
    )}
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.home} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Maps',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.map} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.chat} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.profile} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  iconContainer: {
    borderRadius: 50,
    width: 48,
    height: 48, // w-12 h-12
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 28,
    height: 28, // w-7 h-7
  },
  tabBarStyle: {
    backgroundColor: '#333333',
    borderRadius: 45,
    paddingBottom: 0, // ios only
    marginHorizontal: 30,
    marginBottom: 20,
    height: 65,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
  },
});
