require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets');
const adoptionRoutes = require('./routes/adoption');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // allow JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);

app.get('/', (req, res) => res.send('Pet Adoption API (advanced)'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    const port = process.env.PORT || 5000;
    app.listen(port, ()=> console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error('DB connect error:', err.message);
  });
