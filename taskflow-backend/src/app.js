import express from "express";
import router from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";





const app = express();
app.use(express.json());


app.use("/api/v1", router);



app.use(globalErrorHandler);


export default app;


