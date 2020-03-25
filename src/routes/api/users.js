import express from 'express';
import { signUp, signIn, updateUserDetails } from '../../controllers/index';
import { validate, verifyToken, userVal } from '../../middleware';


const router = express.Router();

router.post('/signup', validate('signUpFields'), validate('signUp'), userVal, signUp);
router.post('/signin', validate('signIn'), signIn);
router.patch('/settings/:_id', verifyToken, validate('details'), updateUserDetails);


export default router;
