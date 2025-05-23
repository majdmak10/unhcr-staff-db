export enum UserRole {
  Admin = "Admin",
  Editor = "Editor",
  Guest = "Guest",
}

export interface IUser {
  id: string;
  _id?: string;
  profilePicture?: string;
  fullName: string;
  slug: string;
  sex: string;
  position: string;
  email: string;
  mobileSyriatel?: string;
  mobileMtn?: string;
  password: string;
  role: UserRole;
}
