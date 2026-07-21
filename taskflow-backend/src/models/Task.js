// src/models/Task.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title is required" }, // Validation per assessment rules[cite: 1]
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
      allowNull: false,
      defaultValue: "MEDIUM",
      validate: {
        isIn: {
          args: [["LOW", "MEDIUM", "HIGH"]],
          msg: "Priority must be LOW, MEDIUM, or HIGH",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED"),
      allowNull: false,
      defaultValue: "PENDING",
      validate: {
        isIn: {
          args: [["PENDING", "IN_PROGRESS", "COMPLETED"]],
          msg: "Status must be PENDING, IN_PROGRESS, or COMPLETED",
        },
      },
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "due_date",
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Task;