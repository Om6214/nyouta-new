import express from 'express';
import { addAddress, getAddress, updateAddress, deleteAddress } from '../controllers/addressController.js';
const router = express.Router();

router.post('/add-address', addAddress);
router.get('/get-address', getAddress);
router.put('/update-address/:addressId', updateAddress);
router.delete('/delete-address/:addressId', deleteAddress);

export default router;