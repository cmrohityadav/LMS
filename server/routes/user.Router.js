import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/user.controller.js";

const router=Router();


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").post(getProfile)


export default router