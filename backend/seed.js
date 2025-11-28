require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Pet = require('./models/Pet');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected for seed');
    await User.deleteMany({});
    await Pet.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash('admin123', salt);
    const userPass = await bcrypt.hash('user123', salt);

    await User.create([
      { name: 'Admin', email: 'admin@site.com', password: adminPass, role: 'admin' },
      { name: 'Test User', email: 'user@site.com', password: userPass, role: 'user' }
    ]);

    await Pet.insertMany([
      { name: 'Milo', type: 'Dog', age: 2, breed: 'Beagle', description: 'Playful & friendly', image: 'https://placedog.net/500/300' },
      { name: 'Luna', type: 'Cat', age: 1, breed: 'Siamese', description: 'Cuddly and calm', image: 'https://placekitten.com/500/300' },
      { name: 'Coco', type: 'Dog', age: 4, breed: 'Labrador', description: 'Good with kids', image: 'https://placedog.net/501/300' }
    ]);

    console.log('Seed done');
    mongoose.disconnect();
  })
  .catch(console.error);
