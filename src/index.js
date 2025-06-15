import app from './server.js';
// import { connectDB } from './db/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const PORT = process.env.PORT || 3000;

const start = async () => {
  await initMongoConnection();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();

// import { setupServer } from './server.js';
// import { initMongoConnection } from './db/initMongoConnection.js';

// const bootstrap = async () => {
//   await initMongoConnection();
//   setupServer();
// };

// bootstrap();
