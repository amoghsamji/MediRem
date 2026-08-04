import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (
    fullName: string,
    email: string,
    phone: string,
    password: string
) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({
        fullName,
        email,
        phone,
        password: hashedPassword,
    });
};

export const generateToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d",
        }
    );
};

export const loginUser = async (
    email: string,
    password: string
) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    return user;
};