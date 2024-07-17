const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModels');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './../../config.env' });

process.env.DATABASE =
  'mongodb+srv://adefemi6k:<PASSWORD>@cluster0.st8gmsm.mongodb.net/natours-app?retryWrites=true';
process.env.DATABASE_PASSWORD = 'agfUvBatjUyZGQmf';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// mongoose.connect(process.env.CORRECT_PASS).then(() => {
//   console.log('DB connection to dev successful');
// });
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// console.log(tours);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data loaded Successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Deleted Succesfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
// console.log(process.argv);
