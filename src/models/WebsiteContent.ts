import { Schema, model, models } from "mongoose";

const websiteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "primary" },
    content: { type: Schema.Types.Mixed, required: true },
    updatedBy: { type: String, trim: true },
  },
  { timestamps: true },
);

export const WebsiteContent =
  models.WebsiteContent || model("WebsiteContent", websiteContentSchema);

