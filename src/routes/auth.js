import { Router } from "express";
import auth from "../controllers/auth";
import verifyAccessToken from "../helpers/jwt/verifyAccessToken";
const router = Router();

router.post("/register", auth.Register);
router.post("/refreshToken", auth.RefreshToken);
router.get("/me", verifyAccessToken, auth.Me);
export default router;
