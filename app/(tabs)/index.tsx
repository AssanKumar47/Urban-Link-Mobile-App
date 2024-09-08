import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Header from '../../components/Header'; 

type Project = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
};

type Problem = {
  id: string;
  description: string;
  status: string;
};

type Locality = {
  id: string;
  name: string;
  projects: Project[];
  problems: Problem[];
};

export default function HomeScreen() {
  const [selectedLocality, setSelectedLocality] = useState<Locality | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const localities: Locality[] = [
    {
      id: '1',
      name: 'Downtown',
      projects: [
        { id: '1', name: 'Downtown Road Maintenance', startDate: '2024-09-15', endDate: '2024-12-15', type: 'Road Work' },
        { id: '2', name: 'Water Pipeline Upgrade', startDate: '2024-10-01', endDate: '2025-02-01', type: 'Water Work' },
      ],
      problems: [
        { id: '1', description: 'Street light malfunction', status: 'In Progress' },
        { id: '2', description: 'Potholes on Main Street', status: 'Reported' },
      ],
    },
    {
      id: '2',
      name: 'Greenwood',
      projects: [
        { id: '3', name: ' Park Expansion', startDate: '2024-08-01', endDate: '2024-11-01', type: 'Construction' },
      ],
      problems: [
        { id: '3', description: 'Water leakage in residential area', status: 'Resolved' },
      ],
    },
  ];

  const filteredLocalities = localities.filter(locality =>
    locality.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocalitySelect = (locality: Locality) => {
    setSelectedLocality(locality);
  };

  const handleNotificationPress = () => {
  };

  const handleProfilePress = () => {
  };

  const renderLocalities = () => (
    <View style={styles.localityContainer}>
      <Text style={styles.header}>Choose Locality</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search locality..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredLocalities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.localityButton} onPress={() => handleLocalitySelect(item)}>
            <Text style={styles.localityButtonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderProjects = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>Upcoming Projects</Text>
      {selectedLocality?.projects.map((project) => (
        <View key={project.id} style={styles.projectContainer}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDetail}>Start Date: {project.startDate}</Text>
          <Text style={styles.projectDetail}>End Date: {project.endDate}</Text>
          <Text style={styles.projectDetail}>Type: {project.type}</Text>
        </View>
      ))}
    </View>
  );

  const renderProblems = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>Current Problems</Text>
      {selectedLocality?.problems.map((problem) => (
        <View key={problem.id} style={styles.problemContainer}>
          <Text style={styles.problemDescription}>{problem.description}</Text>
          <Text style={styles.problemStatus}>Status: {problem.status}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header onNotificationPress={handleNotificationPress} onProfilePress={handleProfilePress} />
      {!selectedLocality ? (
        renderLocalities()
      ) : (
        <View>
          <Text style={styles.header}>Locality: {selectedLocality.name}</Text>
          {renderProjects()}
          {renderProblems()}
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedLocality(null)}>
            <Text style={styles.backButtonText}>Choose Another Locality</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  localityContainer: {
    marginBottom: 20,
  },
  localityButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginBottom: 10,
  },
  localityButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  sectionContainer: {
    marginVertical: 15,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  problemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  problemDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  problemStatus: {
    fontSize: 14,
    color: '#888',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#ff4500',
    borderRadius: 10,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
