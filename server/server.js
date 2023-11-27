// src/server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

const mongoURI = 'mongodb+srv://Galeria:Uu0dxoceIGwf3qA1@galeria.hdzdkkc.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('server online');
});

// Define a route to check login credentials
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('users');
    const collection = db.collection('login_credentials'); // Change 'users' to your collection name

    const user = await collection.findOne({ username });

    if (user) {
      // User found, verify password with bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, login successful
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Passwords don't match, login failed
        res.status(401).json({ message: 'Login failed, double check credentials' });
      }
    } else {
      // User not found, login failed
      res.status(401).json({ message: 'Login failed' });
    }

    client.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/signup', async (req, res) => {
  console.log('Received user data:', req.body);
  // Extract email along with username and password from the request body
  const { username, email, password } = req.body; // email is now included

  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('users');
    const collection = db.collection('login_credentials');

    // Check if the username or email already exists
    const existingUser = await collection.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // Username or email already taken, registration failed
      res.status(409).json({ message: 'Username or email already exists' });
    } else {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user data including email into the database
      await collection.insertOne({ username, email, password: hashedPassword }, (err, result) => {
        if (err) {
          console.error('Error inserting document:', err);
        } else {
          console.log('Inserted document:', result.ops[0]);
        }
      });

      // Registration successful
      res.status(201).json({ message: 'Registration successful' });
    }

    client.close();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/unfilled', async (req, res) => {
  console.log('Received request for /unfilled');
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('orders');
    const collection = db.collection('unfilled');

    const unfilledOrders = await collection.find({}).toArray();
    res.json(unfilledOrders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/orders', async (req, res) => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('orders'); // Replace with your actual database name
    const ordersCollection = db.collection('unfilled');

    const order = req.body; // This should match the order object structure in your client-side code

    const result = await ordersCollection.insertOne(order);
    res.status(201).json({ message: 'Order created successfully', orderId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.toString() });
  }
});

app.get('/orders/:username', async (req, res) => {
  const { username } = req.params;
  
  // Authentication check here: make sure the user is authorized to fetch their orders

  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('orders');
    const ordersCollection = db.collection('unfilled'); // This should be the collection where orders are stored
    console.log('Fetching orders for username:', username);
    // Fetch orders from the database where the 'userId' field matches the provided userId
    const orders = await ordersCollection.find({ username }).toArray();
    console.log('Orders found:', orders);
    res.json(orders);
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
});
