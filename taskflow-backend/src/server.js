import "dotenv/config"; 
import app from "./app.js";
import { sequelize } from "./models/index.js";
import { seedAdminUser } from "./initializer/seedUser.js";
import { seedTasks } from "./initializer/taskseed.js";

const PORT = process.env.PORT || 3000;


async function startServer() {
  try {
    // database connection
    await sequelize.authenticate();
    console.log("PostgreSQL database connected via Sequelize");

    // Sync models 
    await sequelize.sync({ alter: true });

    // seed data
  await seedAdminUser();
  await seedTasks();

    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Database connection failed:", error);
    process.exit(1);
  }
}

startServer();