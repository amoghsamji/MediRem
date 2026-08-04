import { Request, Response } from "express";
import { registerUser, loginUser, generateToken, } from "../services/auth.service";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const register = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { fullName, email, phone, password } = req.body;

        const user = await registerUser(
            fullName,
            email,
            phone,
            password
        );

        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
            },
        });

    } catch (error) {

        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const login = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { email, password } = req.body;

        const user = await loginUser(
            email,
            password
        );

        const token = generateToken(user._id.toString());

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
            },
        });

    } catch (error) {

        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

};

export const getProfile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    const user = await User.findById(req.userId).select("-password");

    res.status(200).json({
        success: true,
        data: user,
    });

};