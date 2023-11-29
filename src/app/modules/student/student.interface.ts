/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export type TUserName = {
    firstname: string;
    middlename?: string;
    lastname: string;
};

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
};

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    password: string;
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
    isDeleted: boolean;
};

//for creating static method
export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance method
// export type StudentMethod = {
//     isUserExists(email: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<
//     TStudent,
//     Record<string, never>,
//     StudentMethod
// >;
