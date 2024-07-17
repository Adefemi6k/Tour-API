const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION. Shutting down...');
  console.log(err.name, '  ', err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION. Shutting down...');
  console.log(err.name, '  ', err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x);

// // TO CONNECT TO LOCAL DB
// mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
//   console.log('DB connection successful');
// });
