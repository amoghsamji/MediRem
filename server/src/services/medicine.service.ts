import Medicine from "../models/medicine.model";

interface AddMedicineData {
    user: string;
    medicineName: string;
    dosage: string;
    type: string;
    frequency: string;
    reminderTimes: string[];
    startDate: Date;
    endDate: Date;
    instructions?: string;
}

export const createMedicine = async (
    medicineData: AddMedicineData
) => {
    return await Medicine.create(medicineData);
};

export const getUserMedicines = async (userId: string) => {
    return await Medicine.find({ user: userId }).sort({
        createdAt: -1,
    });
};

export const updateMedicine = async (
    medicineId: string,
    userId: string,
    medicineData: Partial<AddMedicineData>
) => {
    return await Medicine.findOneAndUpdate(
        {
            _id: medicineId,
            user: userId,
        },
        medicineData,
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deleteMedicine = async (
    medicineId: string,
    userId: string
) => {
    return await Medicine.findOneAndDelete({
        _id: medicineId,
        user: userId,
    });
};