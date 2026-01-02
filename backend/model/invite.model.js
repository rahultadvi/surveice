import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },

    role: {
      type: String,
      enum: ["manager", "agent"],
      required: true
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    token: {
      type: String,
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    },

    isUsed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const InviteModel = mongoose.model("Invite", inviteSchema);

export default InviteModel;
