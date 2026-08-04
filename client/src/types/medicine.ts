export interface Medicine {
    _id: string;
    medicineName: string;
    dosage: string;
    type: string;
    frequency: string;
    reminderTimes: string[];
    startDate: string;
    endDate: string;
    instructions: string;
    isActive: boolean;
}