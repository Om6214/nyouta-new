import express from 'express';
const router = express.Router();
import {authenticateToken} from '../middlewares/authMiddleware.js';
import { getWeddingWebsite,  } from '../controllers/weddingWebsiteController.js';

/* wedding website routes */
router.get('/getWeddingWebsite/:templateId', authenticateToken, getWeddingWebsite);
// router.post('/createWeddingWebsite', createWeddingWebsite);
// router.put('/updateWeddingWebsite/:id', updateWeddingWebsite);
// router.delete('/deleteWeddingWebsite/:id', deleteWeddingWebsite);

export default router;