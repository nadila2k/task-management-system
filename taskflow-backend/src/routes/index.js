import { Router } from "express";



const router = Router();

router.use("/auth", (req , res )=>{
    console.log("auth route")
});


export default router;
