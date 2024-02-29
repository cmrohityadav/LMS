import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/user.controller.js";
import { isLogged } from "../middlewares/auth.middleware.js";

const router=Router();


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").post(isLogged,getProfile)


export default router