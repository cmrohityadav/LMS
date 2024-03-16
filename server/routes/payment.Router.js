import { Router } from "express";
import { verify } from "jsonwebtoken";
import { allPayments, buySubscription, cancleSubscription, getRazorpayApiKey, verifySubscription } from "../controllers/payment.controller.js";

const router=Router()

router.route("/razorpay-key").get(getRazorpayApiKey)

router.route("/subscribe").post(buySubscription)

router.route("/verify").post(verifySubscription)

router.route("/unsubscribe").post(cancleSubscription)

router.route('/').get(allPayments)


export default router