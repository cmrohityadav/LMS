import { Router } from "express";
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateUser } from "../controllers/user.controller.js";
import { isLogged } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router=Router();


router.route("/register").post(upload.single("avatar"),register)
router.route("/login").post(login)
// console.log("hello")
router.route("/logout").get(logout)
router.route('/reset').post(forgotPassword)
router.route('/reset/:resetToken').post(resetPassword)

// secured routes
router.route("/me").post(isLogged,getProfile)
router.route("/changePassword").post(isLogged,changePassword)
router.route("/update").put(isLogged,upload.single("avatar"),updateUser)


export default router