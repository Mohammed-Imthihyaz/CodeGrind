import express from 'express';
import { allQuestions, checkAuth, forgetPassword, loginDetails, logout, resetPassword, signUpDetails, subscribe } from '../controllers/auth.controller';
import { verifyToken } from '../middelware/verifyToken';


const router = express.Router();

router.post('/signup', signUpDetails);
router.post('/login',loginDetails);
router.post('/forgetPassword',forgetPassword);
router.post('/logout',logout);
router.post('/reset-password/:token',resetPassword);
router.get('/check-auth',verifyToken,checkAuth);
router.post('/subscriber',verifyToken,subscribe);
router.get('/getquestions',allQuestions);
export default router;