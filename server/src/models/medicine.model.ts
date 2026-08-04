import mongoose, { Document, Schema } from "mongoose";

export interface IMedicine extends Document {
    user: mongoose.Types.ObjectId;
    medicineName: string;
    dosage: string;
    type: string;
    frequency: string;
    reminderTimes: string[];
    startDate: Date;
    endDate: Date;
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

        dosage: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            required: true,
        },

        frequency: {
            type: String,
            required: true,
        },

        reminderTimes: [
            {
                type: String,
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

        instructions: {
            type: String,
            default: "",
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