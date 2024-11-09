// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="/LoginScreen" // Set LoginScreen as the initial screen
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define Login and Signup screens */}
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignupScreen" />

    </Stack>
  );
}
