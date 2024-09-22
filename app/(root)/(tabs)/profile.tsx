import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let’s Set up Profile</Text>
      <Text style={styles.subtitle}>Lorem ipsum deserve number</Text>

      {/* Input Fields */}
      <TextInput placeholder="First name" placeholderTextColor="#AAAAAA" style={styles.input} />
      <TextInput placeholder="Last name" placeholderTextColor="#AAAAAA" style={styles.input} />
      <TextInput placeholder="Email *" placeholderTextColor="#AAAAAA" style={styles.input} />
      <TextInput
        placeholder="Mobile Number *"
        placeholderTextColor="#AAAAAA"
        style={styles.input}
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Update Details</Text>
        {/* <FontAwesome name="arrow-right" size={24} color="#FFF" style={styles.icon} /> */}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 30,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    marginBottom: 20,
    color: '#FFFFFF',
    fontSize: 16,
  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A4A4A',
    width: '60%',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A4A4A',
    width: '45%',
    paddingVertical: 15,
    borderRadius: 5,
  },
  socialButtonText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
});
