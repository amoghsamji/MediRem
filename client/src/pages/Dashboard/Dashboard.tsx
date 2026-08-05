import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import MedicineCard from "../../components/ui/MedicineCard";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import MedicineForm from "../../components/ui/MedicineForm";

import {
    getMedicines,
    deleteMedicine,
} from "../../services/medicine.service";

import type { Medicine } from "../../types/medicine";

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

    const [selectedMedicine, setSelectedMedicine] =
        useState<Medicine | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [medicineToDelete, setMedicineToDelete] =
        useState<Medicine | null>(null);

    const fetchMedicines = async () => {

        try {

            const response = await getMedicines();

            if (response.success) {
                setMedicines(response.data);
            }

        } catch (error) {

            console.error(error);

            toast.error("Failed to fetch medicines");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchMedicines();

    }, []);

    const handleAddMedicine = () => {

        setSelectedMedicine(null);

        setIsEditing(false);

        setIsModalOpen(true);

    };

    const handleEdit = (medicine: Medicine) => {

        setSelectedMedicine(medicine);

        setIsEditing(true);

        setIsModalOpen(true);

    };

    const handleDelete = (medicine: Medicine) => {

        setMedicineToDelete(medicine);

        setDeleteModalOpen(true);

    };

    const confirmDelete = async () => {

        if (!medicineToDelete) return;

        try {

            await deleteMedicine(
                medicineToDelete._id
            );

            toast.success(
                "Medicine deleted successfully"
            );

            fetchMedicines();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete medicine");

        } finally {

            setDeleteModalOpen(false);

            setMedicineToDelete(null);

        }

    };

    const activeMedicinesCount =
        medicines.filter(
            medicine => medicine.isActive
        ).length;

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
                    onClick={handleAddMedicine}
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

            {/* Medicines */}

            <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                    Today's Medicines
                </h2>

                {loading ? (

                    <p className="text-gray-500">
                        Loading medicines...
                    </p>

                ) : medicines.length === 0 ? (

                    <p className="text-gray-500">
                        No medicines added yet.
                    </p>

                ) : (

                    <div className="space-y-5">

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

            {/* Add / Edit Modal */}

            <Modal
                isOpen={isModalOpen}
                onClose={() => {

                    setIsModalOpen(false);

                    setSelectedMedicine(null);

                    setIsEditing(false);

                }}
                title={
                    isEditing
                        ? "Edit Medicine"
                        : "Add Medicine"
                }
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

            {/* Delete Modal */}

            <ConfirmModal
                isOpen={deleteModalOpen}
                title="Delete Medicine"
                message={`Are you sure you want to delete "${medicineToDelete?.medicineName}"?`}
                onConfirm={confirmDelete}
                onCancel={() => {

                    setDeleteModalOpen(false);

                    setMedicineToDelete(null);

                }}
            />

        </DashboardLayout>

    );

};

export default Dashboard;