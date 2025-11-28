require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const petRoutes = require('./routes/pets');
app.use('/api/pets', petRoutes);

// health
app.get('/', (req, res) => res.send('Pet adopt API'));

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => {
  console.error('DB connect error:', err.message);
});
