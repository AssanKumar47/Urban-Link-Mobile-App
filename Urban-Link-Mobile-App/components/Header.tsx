import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router'; // Import useNavigation for navigation control

const Header = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [notifications, setNotifications] = useState<string[]>(['Water Pipeline is currently constructed in your area.']); 
  const [showNotifications, setShowNotifications] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const handleProfilePress = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleNotificationPress = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    // Set the showProfileOptions to false before logout
    setShowProfileOptions(false);
    console.log('Logged out');

    // Navigate to the LoginScreen and reset the stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const renderProfileOptions = () => (
    <Modal
      transparent={true}
      animationType="fade"
      visible={showProfileOptions}
      onRequestClose={() => setShowProfileOptions(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.profileOptionsContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.profileOption}>
            <Text style={styles.optionText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderNotifications = () => (
    <Modal
      transparent={true}
      animationType="fade"
      visible={showNotifications}
      onRequestClose={() => setShowNotifications(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.notificationsContainer}>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Text key={index} style={styles.notificationText}>{notification}</Text>
            ))
          ) : (
            <Text style={styles.notificationText}>No new notifications</Text>
          )}
          <Pressable onPress={() => setShowNotifications(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.header}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={handleNotificationPress} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress} style={styles.iconButton}>
          <Ionicons name="person-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {renderProfileOptions()}
      {renderNotifications()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  logo: {
    width: 100, 
    height: 100, 
  },
  rightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileOptionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 200,
    elevation: 5,
  },
  notificationsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 250,
    elevation: 5,
  },
  profileOption: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default Header;
