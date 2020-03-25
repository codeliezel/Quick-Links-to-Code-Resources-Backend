import { Router } from 'express';

import userRoute from './api/users';

const router = new Router();

router.use('/user', userRoute);


export default router;
