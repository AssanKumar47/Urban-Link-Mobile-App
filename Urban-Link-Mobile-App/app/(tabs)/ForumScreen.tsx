import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';  // Import axios directly
import Header from '@/components/Header';

const handleNotificationPress = () => {
};

const handleProfilePress = () => {
};

type ForumPost = {
  id: string;
  title: string;
  author: string;
  content: string;
  likes: number;
  dislikes: number;
  likedByUser: boolean;
  dislikedByUser: boolean;
};

export default function ForumScreen() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  // Fetch posts from the backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // Adjust URL to your server
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Handle posting a new message
  const handlePostMessage = async () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPostItem = {
        title: newPostTitle,
        content: newPostContent,
        author: 'Current User', x// This can be dynamic if you're using authentication
      };

      try {
        await axios.post('http://localhost:5000/api/posts', newPostItem); // Adjust URL to your server
        setPosts((prevPosts) => [...prevPosts, newPostItem]);  // Optimistic update
        setNewPostTitle('');
        setNewPostContent('');
        setFormVisible(false);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const renderPost = ({ item }: { item: ForumPost }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postAuthor}>by {item.author}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.reactions}>
        <TouchableOpacity style={styles.reactionButton}>
          <Ionicons name="thumbs-up-outline" size={20} color="green" />
          <Text style={styles.reactionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Ionicons name="thumbs-down-outline" size={20} color="red" />
          <Text style={styles.reactionText}>{item.dislikes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header onNotificationPress={handleNotificationPress} onProfilePress={handleProfilePress} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
      />
      {isFormVisible && (
        <View style={styles.newPostContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title..."
            value={newPostTitle}
            onChangeText={setNewPostTitle}
          />
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Write a new message..."
            value={newPostContent}
            onChangeText={setNewPostContent}
            multiline
          />
          <Button title="Post" onPress={handlePostMessage} />
        </View>
      )}
      <Pressable style={styles.floatingButton} onPress={() => setFormVisible(!isFormVisible)}>
        <Ionicons name="add-outline" size={40} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  newPostContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  messageInput: {
    height: 100, 
  },
  postContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    color: '#333',
  },
  reactions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  reactionText: {
    marginLeft: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#007bff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
