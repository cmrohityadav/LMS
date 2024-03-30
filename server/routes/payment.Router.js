import { Router } from "express";

import { allPayments, buySubscription, cancleSubscription, getRazorpayApiKey, verifySubscription } from "../controllers/payment.controller.js";
import { authorizedRoles, isLogged } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/razorpay-key").get(isLogged,getRazorpayApiKey)

router.route("/subscribe").post(isLogged,buySubscription)

router.route("/verify").post(isLogged,verifySubscription)

router.route("/unsubscribe").post(isLogged,cancleSubscription)

router.route('/').get(isLogged,authorizedRoles("ADMIN"),allPayments)


export default router