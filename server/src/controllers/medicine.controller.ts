import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
    createMedicine,
    getUserMedicines,
    updateMedicineById,
    deleteMedicineById,
} from "../services/medicine.service";

export const addMedicine = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {

        const {
            medicineName,
            strength,
            unit,
            dosageForm,
            frequency,
            reminderTimes,
            startDate,
            numberOfDays,
            instructions,
        } = req.body;

        const endDate = new Date(startDate);

        endDate.setDate(
            endDate.getDate() + Number(numberOfDays) - 1
        );

        const medicine = await createMedicine({

            user: req.userId!,

            medicineName,

            strength,

            unit,

            dosageForm,

            frequency,

            reminderTimes,

            startDate,

            endDate,

            numberOfDays,

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

        const medicines = await getUserMedicines(
            req.userId!
        );

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

export const updateMedicine = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const medicine = await updateMedicineById(

            req.params.id as string,

            req.userId!,

            req.body

        );

        res.status(200).json({

            success: true,

            message: "Medicine updated",

            data: medicine,

        });

    } catch {

        res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

export const deleteMedicine = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        await deleteMedicineById(

            req.params.id as string,

            req.userId!

        );

        res.status(200).json({

            success: true,

            message: "Medicine deleted",

        });

    } catch {

        res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};