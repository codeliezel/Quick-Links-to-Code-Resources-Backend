const express = require('express');

const router = express.Router();
const Users = require('../controllers/users');

router.post('/api/v1/users/add', Users.createUs);


export default router;