import { Router } from "express";

import { protect } from "../middleware/auth.middleware";

import {

    addMedicine,

    getMedicines,

    updateMedicine,

    deleteMedicine,

} from "../controllers/medicine.controller";

const router = Router();

router.post("/", protect, addMedicine);

router.get("/", protect, getMedicines);

router.put("/:id", protect, updateMedicine);

router.delete("/:id", protect, deleteMedicine);

export default router;