/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TGuardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export interface TUserName {
    firstname: string;
    middlename?: string;
    lastname: string;
}

export interface TLocalGuardian {
    name: string;
    occupation: string;
    contactNo: string;
}

export interface TStudent {
    name: TUserName;
    gender: 'male' | 'female';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAdress: string;
    permanentAdress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked';
}

//for creating static method
export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance method
// export interface StudentMethod {
//     isUserExists(email: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<
//     TStudent,
//     Record<string, never>,
//     StudentMethod
// >;
