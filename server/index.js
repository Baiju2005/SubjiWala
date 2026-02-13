require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');
const createAdmin = require('./src/utils/createAdmin');

const startServer = async () => {
  try {
    await connectDB();

    // create admin automatically
    await createAdmin();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
};

startServer();
