export interface IEmergencyContact {
  fullName?: string;
  relationship?: string;
  mobile?: string;
}

export interface IAddress {
  neighborhood?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
  latitude?: string;
  longitude?: string;
}

export interface IStaff {
  id?: string;
  _id?: string;
  profilePicture?: string;
  fullName: string;
  dateOfBirth?: Date;
  sex?: string;
  nationality?: string;
  employmentType?: string;
  position?: string;
  unit?: string;
  bloodType?: string;
  dependents?: string;
  unhcrEmail?: string;
  privateEmail?: string;
  mobileSyriatel?: string;
  mobileMtn?: string;
  homePhone?: string;
  extension?: string;
  radio?: string;
  emergencyContact?: IEmergencyContact;
  contractType?: string;
  contractStartDate?: Date;
  contractEndDate?: Date;
  nationalIdNumber?: string;
  passportNumber?: string;
  passportExpiryDate?: Date;
  unlpNumber?: string;
  unlpExpiryDate?: Date;
  criticalStaff?: boolean;
  warden?: string;
  floorMarshal?: string;
  hasEmergencyTravelBag?: boolean;
  hasFirstAidKit?: boolean;
  isAdvancedDriver?: boolean;
  isInsideDutyStation?: boolean;
  isOutsideDutyStation?: boolean;
  address?: IAddress;
}
