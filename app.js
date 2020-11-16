import express from 'express';
import dotnev from 'dotenv';
import { createServer } from 'http';
import { connectDb } from './startup/db.js';

const app = express();

dotnev.config({ path: './config/dev.env' });
const port = process.env.PORT;

const server = createServer(app);
server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});

connectDb();
