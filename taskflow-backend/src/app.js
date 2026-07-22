import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { serveSwaggerJson, serveSwaggerUi } from "./docs/swaggerUi.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import ApiError from "./utils/ApiError.js";

const app = express();
app.use(cors());
app.use(express.json());

// Swagger API documentation
app.get("/api-docs", serveSwaggerUi);
app.get("/api-docs.json", serveSwaggerJson);

// API Routes
app.use("/api/v1", router);

app.use((req, res, next) => {
  next(ApiError.notFound(`Cannot ${req.method} ${req.originalUrl}`));
});


// Global Error Handler
app.use(errorHandler);


export default app;


