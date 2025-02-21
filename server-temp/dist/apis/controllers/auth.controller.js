"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.logout = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
// Cookie options
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict", // Type-safe
};
// **Signup Controller**
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        // Check if user already exists
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = yield prisma_1.default.user.create({
            data: { email, password: hashedPassword, name },
        });
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
    }
});
exports.signup = signup;
// **Login Controller**
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Compare passwords
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        // Set token in HTTP-only cookie
        res.cookie("token", token, COOKIE_OPTIONS);
        res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
    }
});
exports.login = login;
// **Logout Controller**
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.status(200).json({ message: "Logged out successfully" });
});
exports.logout = logout;
// **Get User Profile Controller**
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const user = yield prisma_1.default.user.findUnique({
            where: { id: req.userId },
            select: { id: true, email: true, name: true }, // Avoid exposing sensitive data
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserProfile = getUserProfile;
