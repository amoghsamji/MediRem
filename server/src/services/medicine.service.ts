import Medicine from "../models/medicine.model";

interface AddMedicineData {
    user: string;

    medicineName: string;

    strength: number;
    unit: string;

    dosageForm: string;

    frequency: string;

    reminderTimes: string[];

    startDate: Date;

    endDate: Date;

    numberOfDays: number;

    instructions?: string;
}

export const createMedicine = async (
    medicineData: AddMedicineData
) => {
    return await Medicine.create(medicineData);
};

export const getUserMedicines = async (
    userId: string
) => {
    return await Medicine.find({
        user: userId,
    }).sort({
        createdAt: -1,
    });
};

export const updateMedicineById = async (
    medicineId: string,
    userId: string,
    updateData: Partial<AddMedicineData>
) => {
    return await Medicine.findOneAndUpdate(
        {
            _id: medicineId,
            user: userId,
        },
        updateData,
        {
            new: true,
        }
    );
};

export const deleteMedicineById = async (
    medicineId: string,
    userId: string
) => {
    return await Medicine.findOneAndDelete({
        _id: medicineId,
        user: userId,
    });
};