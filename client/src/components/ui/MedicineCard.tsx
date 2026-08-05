import {
    Pill,
    Clock,
    Calendar,
    Utensils,
    Pencil,
    Trash2,
} from "lucide-react";

import type { Medicine } from "../../types/medicine";

interface Props {
    medicine: Medicine;
    onEdit: (medicine: Medicine) => void;
    onDelete: (medicine: Medicine) => void;
}

const MedicineCard = ({
    medicine,
    onEdit,
    onDelete,
}: Props) => {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">

            {/* Header */}

            <div className="flex justify-between items-start">

                <div>

                    <h3 className="flex items-center gap-2 text-xl font-bold">

                        <Pill className="text-blue-600" size={22} />

                        {medicine.medicineName}

                    </h3>

                    <p className="text-gray-500 mt-1">

                        {medicine.strength} {medicine.unit} • {medicine.dosageForm}

                    </p>

                </div>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                        medicine.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {medicine.isActive ? "Active" : "Inactive"}
                </span>

            </div>

            {/* Details */}

            <div className="space-y-3 mt-5">

                <div className="flex items-center gap-3 text-gray-700">

                    <Clock size={18} />

                    <span>{medicine.reminderTimes.join(", ")}</span>

                </div>

                <div className="flex items-center gap-3 text-gray-700">

                    <Calendar size={18} />

                    <span>{medicine.numberOfDays} Days</span>

                </div>

                <div className="flex items-center gap-3 text-gray-700">

                    <Utensils size={18} />

                    <span>{medicine.instructions || "No Instructions"}</span>

                </div>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 mt-6">

                <button
                    onClick={() => onEdit(medicine)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                    <Pencil size={16} />
                    Edit
                </button>

                <button
                    onClick={() => onDelete(medicine)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                >
                    <Trash2 size={16} />
                    Delete
                </button>

            </div>

        </div>
    );
};

export default MedicineCard;