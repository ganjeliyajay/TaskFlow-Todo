import { Router } from "express";
import { autoLogin, changeDetail, logout, resendOtp,  sendOtp, updatePassword, userLogin, userRegister, verifyOtp } from "../controllers/AuthController.js";

export const AuthoRoutes = Router()

AuthoRoutes.route('/register').post(userRegister)
AuthoRoutes.route('/login').post(userLogin)
AuthoRoutes.route('/updatepass').post(updatePassword)
AuthoRoutes.route('/updatedetail').post(changeDetail)
AuthoRoutes.route('/sendotp').post(sendOtp)
AuthoRoutes.route('/verifyotp').post(verifyOtp)
AuthoRoutes.route('/resetsendotp').post(resendOtp)
AuthoRoutes.route('/login/me').get(autoLogin)
AuthoRoutes.route('/logout').post(logout);



