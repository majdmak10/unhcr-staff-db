import mongoose, { Schema } from "mongoose";
import { IStaff, IEmergencyContact, IAddress } from "@/types/staff.types";

// Define the emergency contact schema
const EmergencyContactSchema = new Schema<IEmergencyContact>({
  fullName: { type: String },
  relationship: { type: String },
  mobile: { type: String },
});

// Define the address schema
const AddressSchema = new Schema<IAddress>({
  neighborhood: { type: String },
  street: { type: String },
  building: { type: String },
  floor: { type: String },
  apartment: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

// Define the staff schema
const StaffSchema = new Schema<IStaff>(
  {
    profilePicture: { type: String },
    fullName: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: { type: Date },
    sex: { type: String, required: true },
    nationality: { type: String },
    employmentType: { type: String },
    position: { type: String },
    unit: { type: String },
    bloodType: { type: String },
    dependents: { type: String },
    unhcrEmail: {
      type: String,
      unique: true,
      sparse: true,
      default: null,
    },
    privateEmail: {
      type: String,
      unique: true,
      sparse: true,
      default: null,
    },

    mobileSyriatel: {
      type: String,
      match: /^[0-9]{9}$/,
      required: false,
      default: null,
    },
    mobileMtn: {
      type: String,
      match: /^[0-9]{9}$/,
      required: false,
      default: null,
    },
    homePhone: {
      type: String,
      match: /^[0-9]{9}$/,
      required: false,
      default: null,
    },

    extension: { type: String },
    radio: { type: String },
    emergencyContact: { type: EmergencyContactSchema },
    contractType: { type: String },
    contractStartDate: { type: Date },
    contractEndDate: { type: Date },
    nationalIdNumber: { type: String },
    passportNumber: { type: String },
    passportExpiryDate: { type: Date },
    unlpNumber: { type: String },
    unlpExpiryDate: { type: Date },
    criticalStaff: { type: Boolean, default: true },
    warden: { type: String },
    floorMarshal: { type: String },
    etb: { type: Boolean, default: true },
    ifak: { type: Boolean, default: true },
    advancedDriving: { type: Boolean, default: true },
    insideDs: { type: Boolean, default: true },
    outsideDs: { type: Boolean, default: true },
    address: { type: AddressSchema },
  },
  { timestamps: true }
);

// Create a compound index for email uniqueness
// StaffSchema.index({ unhcrEmail: 1, privateEmail: 1 }, { unique: true });

export const Staff =
  mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema);
