import express from "express";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import ApiError from "./utils/ApiError.js";





const app = express();
app.use(express.json());

// API Routes
app.use("/api/v1", router);

app.use((req, res, next) => {
  next(ApiError.notFound(`Cannot ${req.method} ${req.originalUrl}`));
});


// Global Error Handler
app.use(errorHandler);


export default app;


