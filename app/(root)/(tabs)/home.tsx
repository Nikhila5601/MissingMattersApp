import { icons } from '@/constants';
import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo'; 
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'; 
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');
// Correctly defined constants
const HEADER_HEIGHT = 100; // Collapsed header height
const ICONS_HEIGHT = 60; // Initial icons height
const HEADER_EXPANDED_HEIGHT = 120; // Expanded header height

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [cards, setCards] = useState(generateCards(10)); // Initial 10 cards
  const [refreshing, setRefreshing] = useState(false); // Refresh control state
  const [loadingMore, setLoadingMore] = useState(false); // Loading state
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigation = useNavigation(); // Moved useNavigation here

  const handleSignOut = async () => {
    // try {
    signOut();
    router.replace('/(auth)/sign-in')
    //   navigation.replace('SignIn'); // Navigate to SignIn screen
    // } catch (error) {
    //   console.error('Sign out failed', error);
    // }
  };

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

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0], // Header disappears as it scrolls up
    extrapolate: 'clamp',
  });

  const profileOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_HEIGHT],
    outputRange: [1, 0], // Profile disappears as it scrolls up
    extrapolate: 'clamp',
  });

  // Function to handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setCards(generateCards(10)); // Refresh with new data
      setRefreshing(false);
    }, 2000); // Simulate network request
  }, []);

  // Generate dummy cards data
  function generateCards(count: number) {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${index}`,
      image: 'https://via.placeholder.com/300x300',
    }));
  }

  // Function to load more cards
  const loadMoreCards = () => {
    if (loadingMore) return; // Avoid duplicate calls
    setLoadingMore(true);
    setTimeout(() => {
      setCards((prevCards) => [...prevCards, ...generateCards(10)]);
      setLoadingMore(false);
    }, 1500); // Simulate network request
  };

  return (
    <View style={styles.container}>
      {/* Animated Header with Disappearing Effect */}
      <Animated.View style={[styles.header, { height: headerHeight, opacity: headerOpacity }]}>
        {/* Profile Container with Animated Opacity */}
        <Animated.View style={[styles.profileContainer, { opacity: profileOpacity }]}>
          <View style={styles.Profile}>
            <Text style={styles.greetingText}>
              Hi, {user?.username || user?.emailAddresses[0].emailAddress.split('@')[0]}!
            </Text>
          </View>
          {/* <TouchableOpacity onPress={handleSignOut}>
            <Image style={styles.signOut} source={icons.out} />
          </TouchableOpacity> */}
        </Animated.View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        onMomentumScrollEnd={({ nativeEvent }) => {
          // Check if the user is at the end of the list
          const isCloseToBottom =
            nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 20;
          if (isCloseToBottom) {
            loadMoreCards();
          }
        }}
      >
        <Text style={styles.Explore}>Explore</Text>
        {/* Render Cards */}
        {cards.map((card) => (
          <View style={styles.card} key={card.id}>
            <Image
              source={{ uri: card.image }} // Placeholder image
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <View style={styles.cardIcon}>
                <Icon name="circle" size={20} color="#4A4A4A" />
              </View>
              <Text style={styles.cardText}>{card.text}</Text>
              <Icon name="heart" size={24} color="#FFFFFF" style={styles.cardIconRight} />
              <Icon name="paper-plane" size={24} color="#FFFFFF" style={styles.cardIconRight} />
            </View>
          </View>
        ))}

        {/* Loading Indicator */}
        {loadingMore && (
          <ActivityIndicator size="large" color="#FFFFFF" style={{ marginVertical: 20 }} />
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
  },
  header: {
    width: '100%',
    backgroundColor: '#3F3F3F',
    paddingHorizontal: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30, // Top-left corner radius
    borderBottomRightRadius: 30, // Top-right corner radius
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1, // Ensure header stays above other content
  },
  profileContainer: {
    width: '100%', // Ensure it takes full width
    flexDirection: 'row',
    justifyContent: 'space-between', // Place the elements on opposite sides
    alignItems: 'center',
    paddingHorizontal: 20, // Add some padding for the content inside
  },
  Explore: {
    fontSize: 20,
    
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  signOut: {
    width: 20,
    height: 20,
  },
  Profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  scrollViewContent: {
    marginTop: 20,
    paddingTop: HEADER_EXPANDED_HEIGHT,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 30, // Top-left corner radius
    borderTopRightRadius: 30, // Top-right corner radius
    backgroundColor: '#E1DCDC',
    zIndex: -1,
  },
  card: {
    backgroundColor: '#3F3F3F',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  cardIconRight: {
    marginLeft: 10,
  },
});
