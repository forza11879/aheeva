import mongoose from 'mongoose';

export const connectDb = async () => {
  const uri = process.env.MONGODB_URL;
  const options = {
    socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
    keepAlive: true, // is true by default since mongoose 5.2.0.
    poolSize: 10, // Maintain up to 10 socket connections
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    //   autoIndex: false, // By default, mongoose will automatically build indexes defined in your schema when it connects. This is great for development, but not ideal for large production deployments, because index builds can cause performance degradation. If you set autoIndex to false, mongoose will not automatically build indexes for any model associated with this connection.
  };
  mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
  // Connect to our Database and handle any bad connections

  await mongoose.connect(uri, options);
  const db = mongoose.connection;
  console.log('MongoDB Connected at host : ', db.host);
};
