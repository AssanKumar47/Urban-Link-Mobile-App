import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

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
  const [posts, setPosts] = useState<ForumPost[]>([
    { id: '1', title: 'Project Update Needed', author: 'John Doe', content: 'Can we get an update on the Main Street project?', likes: 0, dislikes: 0, likedByUser: false, dislikedByUser: false },
    { id: '2', title: 'Water Line Issue', author: 'Jane Smith', content: 'There seems to be an issue with the water line replacement in Downtown.', likes: 0, dislikes: 0, likedByUser: false, dislikedByUser: false },
  ]);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const handleNotificationPress = () => {
  };

  const handleProfilePress = () => {
  };

  const handlePostMessage = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPostItem: ForumPost = {
        id: (posts.length + 1).toString(),
        title: newPostTitle,
        author: 'Current User',
        content: newPostContent,
        likes: 0,
        dislikes: 0,
        likedByUser: false,
        dislikedByUser: false,
      };
      setPosts([...posts, newPostItem]);
      setNewPostTitle('');
      setNewPostContent('');
      setFormVisible(false);
    }
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(post =>
      post.id === id
        ? {
            ...post,
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
            likedByUser: !post.likedByUser,
            dislikedByUser: false,
          }
        : post
    ));
  };

  const handleDislike = (id: string) => {
    setPosts(posts.map(post =>
      post.id === id
        ? {
            ...post,
            dislikes: post.dislikedByUser ? post.dislikes - 1 : post.dislikes + 1,
            dislikedByUser: !post.dislikedByUser,
            likedByUser: false,
          }
        : post
    ));
  };

  const renderPost = ({ item }: { item: ForumPost }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postAuthor}>by {item.author}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.reactions}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.reactionButton}>
          <Ionicons name={item.likedByUser ? 'thumbs-up' : 'thumbs-up-outline'} size={20} color="green" />
          <Text style={styles.reactionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDislike(item.id)} style={styles.reactionButton}>
          <Ionicons name={item.dislikedByUser ? 'thumbs-down' : 'thumbs-down-outline'} size={20} color="red" />
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
