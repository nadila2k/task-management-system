import bcrypt from "bcrypt";
import User from "../models/User.js";


export const seedAdminUser = async () => {
  try {
    const adminEmail = "admin@test.com"; 
    

    const existingUser = await User.findOne({ where: { email: adminEmail } });

    if (!existingUser) {

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("123456", saltRounds);

      await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
      });

      console.log("Default admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Failed to seed admin user:", error);
  }
};