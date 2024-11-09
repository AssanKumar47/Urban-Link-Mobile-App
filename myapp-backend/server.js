const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://assan0047:V8JiatcFUoN9DMJA@cluster0.pmldv.mongodb.net/yourDBName'; // Replace yourDBName with your database name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
const UserSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  locality: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Post schema
const PostSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedByUser: { type: [String], default: [] }, // Store user ids who liked
  dislikedByUser: { type: [String], default: [] }, // Store user ids who disliked
});

const Post = mongoose.model('Post', PostSchema);

// Sign up endpoint
app.post('/api/signup', async (req, res) => {
  const { name, phone, locality, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, phone, locality, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    res.status(200).json({ message: 'Login successful!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Create post endpoint
app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// Get posts endpoint
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
