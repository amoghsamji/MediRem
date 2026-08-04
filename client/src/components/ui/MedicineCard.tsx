import { Pill } from "lucide-react";
import type { Medicine } from "../../types/medicine";

interface Props {
    medicine: Medicine;
}

const MedicineCard = ({ medicine }: Props) => {
    return (
        <div className="bg-white rounded-xl shadow p-5">

            <h3 className="flex items-center gap-2 text-lg font-bold">
                <Pill size={20} />
                {medicine.medicineName}
            </h3>

            <p className="mt-2 text-gray-600">
                {medicine.dosage}
            </p>

            <p className="text-gray-600">
                {medicine.reminderTimes.join(", ")}
            </p>

            <p className="text-blue-600 mt-2">
                {medicine.instructions}
            </p>

        </div>
    );
};

export default MedicineCard;