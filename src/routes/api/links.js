import express from 'express';
import {
  addLink, getLink, getAllLinks, updateLink, deleteLink,
} from '../../controllers/index';
import {
  validate, verifyToken,
} from '../../middleware';
const router = express.Router();

router.post('/add', verifyToken, validate('addLinks'), addLink);
router.get('/view/all', getAllLinks);
router.patch('/update/:linkId', verifyToken, updateLink);
router.delete('/delete/:linkId', verifyToken, deleteLink);
router.get('/view/:linkId', getLink);


export default router;
