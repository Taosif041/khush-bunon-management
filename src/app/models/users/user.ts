export interface User {
  id?: string;
  name: string;
  email: string;
  contactNo: string;
  profession: string;
  memberType: string;
  personalDetails: string;
  registered: Date;
  addedBy: string;
  isActive: boolean;
  isRemoved: boolean;
}
