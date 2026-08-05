export interface Medicine {
    _id: string;

    medicineName: string;

    strength: number;

    unit: string;

    dosageForm: string;

    frequency: string;

    reminderTimes: string[];

    startDate: string;

    numberOfDays: number;

    instructions: string;

    isActive: boolean;

    createdAt?: string;

    updatedAt?: string;
}