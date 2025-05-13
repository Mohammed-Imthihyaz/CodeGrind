import express from 'express';
import { checkAuth, forgetPassword, loginDetails, logout, signUpDetails, subscribe } from '../controllers/auth.controller';
import { verifyToken } from '../middelware/verifyToken';


const router = express.Router();

router.post('/signup', signUpDetails);
router.post('/login',loginDetails);
router.post('/forgetPassword',forgetPassword);
router.post('/logout',logout);
router.get('/check-auth',verifyToken,checkAuth);
router.post('/subscriber',verifyToken,subscribe)
export default router;