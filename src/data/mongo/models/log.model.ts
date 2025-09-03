/**
 * Log model
 * level: string;
 * message: string;
 * origin: string;
 * createdAt: Date;
 */

import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  message: { type: String, required: true },
  origin: { type: String },
  level: { type: String, enum: ["low", "medium", "high"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const LogModel = mongoose.model("Log", logSchema);
