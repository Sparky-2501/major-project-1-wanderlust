// scripts/backfillCategory.js
const mongoose = require('mongoose');

const Listing = require('../models/listing.js'); // adjust path if needed
const CATEGORIES = Listing.CATEGORIES || [
  'Trending','Rooms','Iconic cities','Mountains','Castles','Amazing pools',
  'Farms','Camping','Arctic','Bed & breakfast','Beach'
];

async function run() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Set category to 'Trending' for listings that don't have category or have invalid value
    const res = await Listing.updateMany(
      {
        $or: [
          { category: { $exists: false } },
          { category: null },
          { category: '' }
        ]
      },
      { $set: { category: 'Trending' } }
    );

    console.log('Updated documents:', res.modifiedCount || res.nModified || res.modified || res);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

run();
