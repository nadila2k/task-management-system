import "dotenv/config"; 
import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 3000;


async function startServer() {
  try {
    // database connection
    await sequelize.authenticate();
    console.log("✅PostgreSQL database connected via Sequelize");

    // Sync models 
    await sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Database connection failed:", error);
    process.exit(1);
  }
}

startServer();