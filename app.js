import express from 'express';
import dotnev from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { connectDb } from './startup/db.js';
import { getWebSocket } from './startup/webSocket.js';

// routes
import mainRoute from './routes/main.js';

const app = express();

app.use(cors());

dotnev.config({ path: './config/dev.env' });

// Mount Rout
app.use('/', mainRoute);

const port = process.env.PORT;
const server = createServer(app);
server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});
// connect DB
connectDb();
// Web Socket
getWebSocket(app, server);

// Handle DB unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error Mongo DB: ${err.message}`);
  // Close serve and exit process
  server.close(() => process.exit(1));
});
