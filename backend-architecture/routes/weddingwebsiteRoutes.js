import express from 'express';
const router = express.Router();
import {authenticateToken} from '../middlewares/authMiddleware.js';
import { getWeddingWebsite,createWeddingWebsite,updateWeddingWebsite,getWeddingWebsitePreview,updateWeddingWebsitedata } from '../controllers/weddingWebsiteController.js';

/* wedding website routes */
router.get('/getWeddingWebsite/:slug', getWeddingWebsite);
router.get('/getWeddingWebsite/:templateId', authenticateToken, getWeddingWebsitePreview);
router.post('/createWeddingWebsite/:templateId', authenticateToken, createWeddingWebsite);
router.put('/updateWeddingWebsite/:templateId', authenticateToken, updateWeddingWebsite);
router.put('/updateWeddingWebsitedata', authenticateToken, updateWeddingWebsitedata);
// router.delete('/deleteWeddingWebsite/:id', deleteWeddingWebsite);

export default router;