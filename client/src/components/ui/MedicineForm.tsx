import { useState } from "react";
import toast from "react-hot-toast";
import { addMedicine } from "../../services/medicine.service";
const dayOptions = [3, 5, 7, 10, 14, 30];

interface MedicineFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const MedicineForm = ({
    onSuccess,
    onCancel,
}: MedicineFormProps) => {
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        medicineName: "",
        strength: "",
        unit: "mg",
        dosageForm: "Tablet",
        frequency: "Once Daily",
        reminderTimes: [""],
        startDate: "",
        numberOfDays: 5,
        customDays: "",
        useCustomDays: false,
        instructions: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFrequencyChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const frequency = e.target.value;

        let reminderTimes = [""];
        if (frequency === "Twice Daily") reminderTimes = ["", ""];
        if (frequency === "Three Times Daily") reminderTimes = ["", "", ""];

        setFormData({
            ...formData,
            frequency,
            reminderTimes,
        });
    };

    const updateTime = (index: number, value: string) => {
        const arr = [...formData.reminderTimes];
        arr[index] = value;
        setFormData({ ...formData, reminderTimes: arr });
    };

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.medicineName.trim()) {
            toast.error("Medicine name is required");
            return;
        }

        const days = formData.useCustomDays ? Number(formData.customDays) : formData.numberOfDays;
        if (!days || days <= 0) {
            toast.error("Please specify a valid number of days");
            return;
        }

        try {
            setSubmitting(true);
            await addMedicine({
                medicineName: formData.medicineName,
                strength: Number(formData.strength),
                unit: formData.unit,
                dosageForm: formData.dosageForm,
                frequency: formData.frequency,
                reminderTimes: formData.reminderTimes.filter(t => t !== ""),
                startDate: formData.startDate,
                numberOfDays: days,
                instructions: formData.instructions,
            });

            toast.success("Medicine added successfully");
            onSuccess();
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add medicine");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Add Medicine</h2>

            <div className="grid grid-cols-2 gap-5">

                <div className="col-span-2">
                    <label className="font-medium">Medicine Name</label>
                    <input
                        name="medicineName"
                        className="border rounded-lg p-3 w-full mt-2"
                        placeholder="Paracetamol"
                        value={formData.medicineName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="font-medium">Strength</label>
                    <input
                        type="number"
                        min="1"
                        name="strength"
                        className="border rounded-lg p-3 w-full mt-2"
                        placeholder="650"
                        value={formData.strength}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="font-medium">Unit</label>
                    <select
                        name="unit"
                        className="border rounded-lg p-3 w-full mt-2"
                        value={formData.unit}
                        onChange={handleChange}
                    >
                        <option>mg</option>
                        <option>ml</option>
                        <option>g</option>
                        <option>mcg</option>
                    </select>
                </div>

                <div>
                    <label className="font-medium">Dosage Form</label>
                    <select
                        name="dosageForm"
                        className="border rounded-lg p-3 w-full mt-2"
                        value={formData.dosageForm}
                        onChange={handleChange}
                    >
                        <option>Tablet</option>
                        <option>Capsule</option>
                        <option>Syrup</option>
                        <option>Drops</option>
                        <option>Injection</option>
                        <option>Inhaler</option>
                    </select>
                </div>

                <div>
                    <label className="font-medium">Frequency</label>
                    <select
                        name="frequency"
                        className="border rounded-lg p-3 w-full mt-2"
                        value={formData.frequency}
                        onChange={handleFrequencyChange}
                    >
                        <option>Once Daily</option>
                        <option>Twice Daily</option>
                        <option>Three Times Daily</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="font-medium">Reminder Times</label>
                    <div className="space-y-3 mt-3">
                        {formData.reminderTimes.map((t, i) => (
                            <div key={i}>
                                <label className="text-sm text-gray-500">
                                    {["First", "Second", "Third"][i]} Dose Time
                                </label>
                                <input
                                    type="time"
                                    value={t}
                                    className="border rounded-lg p-3 w-full mt-1"
                                    onChange={(e) => updateTime(i, e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="font-medium">Start Date</label>
                    <input
                        type="date"
                        min={today}
                        name="startDate"
                        className="border rounded-lg p-3 w-full mt-2"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="font-medium">Number of Days</label>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {dayOptions.map(day => (
                            <button
                                type="button"
                                key={day}
                                onClick={() => setFormData({ ...formData, numberOfDays: day, useCustomDays: false })}
                                className={`px-3 py-2 rounded-lg border ${!formData.useCustomDays && formData.numberOfDays === day
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.useCustomDays}
                                onChange={(e) => setFormData({ ...formData, useCustomDays: e.target.checked })}
                            />
                            Custom Days
                        </label>

                        <input
                            type="number"
                            min="1"
                            disabled={!formData.useCustomDays}
                            value={formData.customDays}
                            onChange={(e) => setFormData({ ...formData, customDays: e.target.value })}
                            placeholder="Enter number of days"
                            className="border rounded-lg p-3 w-full mt-2 disabled:bg-gray-100"
                        />
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="font-medium">When to take?</label>

                    <input
                        list="instructions"
                        name="instructions"
                        className="border rounded-lg p-3 w-full mt-2"
                        placeholder="After Lunch"
                        value={formData.instructions}
                        onChange={handleChange}
                    />

                    <datalist id="instructions">
                        <option value="Before Breakfast" />
                        <option value="After Breakfast" />
                        <option value="Before Lunch" />
                        <option value="After Lunch" />
                        <option value="Before Dinner" />
                        <option value="After Dinner" />
                        <option value="Before Sleep" />
                        <option value="Empty Stomach" />
                        <option value="With Water" />
                        <option value="With Milk" />
                    </datalist>
                </div>

            </div>

            <div className="flex justify-end gap-3 mt-8">
                <button
                    type="button"
                    onClick={onCancel}
                    className="border px-5 py-3 rounded-lg hover:bg-gray-50 transition"
                    disabled={submitting}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-blue-400 transition"
                    disabled={submitting}
                >
                    {submitting ? "Saving..." : "Save Medicine"}
                </button>
            </div>
        </form>
    );
};

export default MedicineForm;