import mongoose, { Document, Schema } from "mongoose";

export interface IMedicine extends Document {
    user: mongoose.Types.ObjectId;

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

    isActive: boolean;
}

const medicineSchema = new Schema<IMedicine>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        medicineName: {
            type: String,
            required: true,
            trim: true,
        },

        strength: {
            type: Number,
            required: true,
        },

        unit: {
            type: String,
            required: true,
            trim: true,
        },

        dosageForm: {
            type: String,
            required: true,
            trim: true,
        },

        frequency: {
            type: String,
            required: true,
        },

        reminderTimes: [
            {
                type: String,
                required: true,
            },
        ],

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        numberOfDays: {
            type: Number,
            required: true,
            min: 1,
        },

        instructions: {
            type: String,
            default: "",
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Medicine = mongoose.model<IMedicine>(
    "Medicine",
    medicineSchema
);

export default Medicine;