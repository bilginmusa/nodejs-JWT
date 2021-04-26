import { Router } from "express";
import auth from "./auth";

const router = Router();

router.use("/auth", auth);

router.get("/", (req, res) => {
  res.end("Hola!");
});

export default router;
