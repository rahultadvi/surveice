import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      required: false   
    }
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
