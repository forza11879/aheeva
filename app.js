import express from 'express';
import dotnev from 'dotenv';
import { createServer } from 'http';
import { connectDb } from './startup/db.js';

// routes
import mainRoute from './routes/main.js';

const app = express();

dotnev.config({ path: './config/dev.env' });
// connect DB
connectDb();
// Mount Rout
app.use('/', mainRoute);

const port = process.env.PORT;
const server = createServer(app);
server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error Mongo DB: ${err.message}`);
  // Close serve and exit process
  server.close(() => process.exit(1));
});
