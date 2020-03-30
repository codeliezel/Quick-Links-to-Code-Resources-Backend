import { Router } from 'express';

import userRoute from './api/users';
import linkRoute from './api/links';

const router = new Router();

router.use('/user', userRoute);
router.use('/link', linkRoute);

export default router;
