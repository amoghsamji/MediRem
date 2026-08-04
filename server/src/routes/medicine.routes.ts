import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
    addMedicine,
    getMedicines,
    editMedicine,
    removeMedicine,
} from "../controllers/medicine.controller";
const router = Router();

router.post("/", protect, addMedicine);
router.get("/", protect, getMedicines);
router.put("/:id", protect, editMedicine);
router.delete("/:id", protect, removeMedicine);

export default router;