require('dotenv').config();
const mongoose = require('mongoose');
const Pet = require('./models/Pet');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(async () => {
  console.log('Connected for seeding');
  await Pet.deleteMany({});
  const sample = [
    { name: 'Milo', type: 'Dog', age: 2, breed: 'Beagle', description: 'Friendly & playful', image: 'https://placedog.net/400/300' },
    { name: 'Luna', type: 'Cat', age: 1, breed: 'Siamese', description: 'Calm cuddler', image: 'https://placekitten.com/400/300' },
    { name: 'Coco', type: 'Dog', age: 4, breed: 'Labrador', description: 'Great with kids', image: 'https://placedog.net/401/300' }
  ];
  await Pet.insertMany(sample);
  console.log('Seeded', sample.length, 'pets');
  mongoose.disconnect();
}).catch(console.error);
