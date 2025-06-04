export enum UserRole {
  VISITOR = 'VISITOR',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  galleryId?: number;
  phoneNumber?: string;
  enabled: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface UserListItem {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  enabled: boolean;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface UserFilter {
  role?: UserRole;
  enabled?: boolean;
  galleryId?: number;
}