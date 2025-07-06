import { addAddress,getAllAddress,updateAddress,deleteAddress } from "../controllers/address,controller.js";
import e from "express";
const app = e();
const router = e.Router();

router.post('/add', addAddress);
router.get('/:userId', getAllAddress);
router.put('/update/:addressId', updateAddress);
router.delete('/delete/:addressId', deleteAddress);
export default router;