import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import * as Progress from 'react-native-progress'; 

type Project = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  progress: number;
};

export default function LocalScreen() {
  const [projects] = useState<Project[]>([
    { id: '1', name: 'Main Street Road Work', startDate: '2024-09-01', endDate: '2024-12-01', type: 'Road Work', progress: 0.4 },
    { id: '2', name: 'Downtown Water Line Replacement', startDate: '2024-10-15', endDate: '2025-01-15', type: 'Water Work', progress: 0.1 },
    { id: '3', name: 'Patch Work', startDate: '2024-08-01', endDate: '2024-08-10', type: 'Repair', progress: 0.7 },
  
  ]);

  const handleNotificationPress = () => {
  };

  const handleProfilePress = () => {
  };

  const renderProject = ({ item }: { item: Project }) => (
    <View style={styles.projectContainer}>
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectDetail}>Start Date: {item.startDate}</Text>
      <Text style={styles.projectDetail}>End Date: {item.endDate}</Text>
      <Text style={styles.projectDetail}>Type: {item.type}</Text>
      <Progress.Bar progress={item.progress} width={200} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header onNotificationPress={handleNotificationPress} onProfilePress={handleProfilePress} />
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderProject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  projectContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDetail: {
    fontSize: 16,
    color: '#555',
  },
});
