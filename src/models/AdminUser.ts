import { InferSchemaType, Schema, model, models } from "mongoose";

const adminUserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["ADMIN", "MANAGER"], default: "ADMIN" },
    status: { type: String, enum: ["ACTIVE", "DISABLED"], default: "ACTIVE" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

export type AdminUserDocument = InferSchemaType<typeof adminUserSchema>;
export const AdminUser = models.AdminUser || model("AdminUser", adminUserSchema);
