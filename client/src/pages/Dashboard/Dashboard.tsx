import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import MedicineCard from "../../components/ui/MedicineCard";
import { getMedicines } from "../../services/medicine.service";
import type { Medicine } from "../../types/medicine";
import Modal from "../../components/ui/Modal";
import MedicineForm from "../../components/ui/MedicineForm";
import { deleteMedicine } from "../../services/medicine.service";
import toast from "react-hot-toast";


import {
    Pill,
    Bell,
    Activity,
    Plus,
} from "lucide-react";

const Dashboard = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
const [isEditing, setIsEditing] = useState(false);


    const fetchMedicines = async () => {

        try {

            const response = await getMedicines();

            if (response.success) {

                setMedicines(response.data);

            }

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleEdit = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsEditing(true);
    setIsModalOpen(true);
};

const handleDelete = async (medicine: Medicine) => {
    const confirmed = window.confirm(
        `Delete ${medicine.medicineName}?`
    );

    if (!confirmed) return;

    try {
        await deleteMedicine(medicine._id);

        toast.success("Medicine deleted");

        fetchMedicines();

    } catch (error) {

        console.error(error);

        toast.error("Failed to delete medicine");

    }
};

    useEffect(() => {

        fetchMedicines();

    }, []);

    const activeMedicinesCount = medicines.filter(m => m.isActive).length;

    return (
        <DashboardLayout>

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold text-slate-800">
                        Welcome 👋
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Here's your medicine overview for today.
                    </p>

                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                >
                    <Plus size={20} />
                    Add Medicine
                </button>

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-3 gap-6 mt-10">

                <StatCard
                    title="Today's Medicines"
                    value={medicines.length.toString()}
                    icon={<Pill size={35} />}
                />

                <StatCard
                    title="Active Medicines"
                    value={activeMedicinesCount.toString()}
                    icon={<Activity size={35} />}
                />

                <StatCard
                    title="Next Reminder"
                    value="09:00"
                    icon={<Bell size={35} />}
                />

            </div>

            {/* Medicine List */}

            <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                    Today's Medicines
                </h2>

                {loading ? (
                    <p className="text-gray-500">Loading medicines...</p>
                ) : medicines.length === 0 ? (
                    <p className="text-gray-500">No medicines added yet. Click "Add Medicine" to get started!</p>
                ) : (
                    <div className="space-y-4">
                        {medicines.map((medicine) => (
                            <MedicineCard
    key={medicine._id}
    medicine={medicine}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>
                        ))}
                    </div>
                )}

            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Medicine"
            >
                <MedicineForm
    medicine={selectedMedicine}
    isEditing={isEditing}
    onSuccess={() => {
        setIsModalOpen(false);
        setSelectedMedicine(null);
        setIsEditing(false);
        fetchMedicines();
    }}
    onCancel={() => {
        setIsModalOpen(false);
        setSelectedMedicine(null);
        setIsEditing(false);
    }}
/>
            </Modal>

        </DashboardLayout>

    );
};

export default Dashboard;