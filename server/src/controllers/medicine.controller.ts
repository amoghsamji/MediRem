import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
    createMedicine,
    getUserMedicines,
    updateMedicine,
    deleteMedicine,
} from "../services/medicine.service";
export const addMedicine = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const {
            medicineName,
            dosage,
            type,
            frequency,
            reminderTimes,
            startDate,
            endDate,
            instructions,
        } = req.body;

        const medicine = await createMedicine({
            user: req.userId!,
            medicineName,
            dosage,
            type,
            frequency,
            reminderTimes,
            startDate,
            endDate,
            instructions,
        });

        res.status(201).json({
            success: true,
            message: "Medicine added successfully",
            data: medicine,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getMedicines = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const medicines = await getUserMedicines(req.userId!);

        res.status(200).json({
            success: true,
            data: medicines,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const editMedicine = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const medicine = await updateMedicine(
            req.params.id,
            req.userId!,
            req.body
        );

        if (!medicine) {
            res.status(404).json({
                success: false,
                message: "Medicine not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: medicine,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const removeMedicine = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const medicine = await deleteMedicine(
            req.params.id,
            req.userId!
        );

        if (!medicine) {
            res.status(404).json({
                success: false,
                message: "Medicine not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};