import { Schema, model } from 'mongoose';
import {
    Guardian,
    LocalGuardian,
    Student,
    UserName,
} from './student.interface';

const guardianSchema = new Schema<Guardian>({
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});

const localGuardianSchema = new Schema<LocalGuardian>({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
});

const userNameSchema = new Schema<UserName>({
    firstname: { type: 'string', required: true },
    middlename: { type: 'string' },
    lastname: { type: 'string', required: true },
});

const studentSchema = new Schema<Student>(
    {
        name: {
            type: userNameSchema,
            required: true,
        },
        gender: ['male', 'female'],
        dateOfBirth: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        emergencyContactNo: {
            type: String,
            required: true,
        },
        bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        presentAdress: {
            type: String,
            required: true,
        },
        permanentAdress: {
            type: String,
            required: true,
        },
        guardian: {
            type: guardianSchema,
            required: true,
        },
        localGuardian: {
            type: localGuardianSchema,
            required: true,
        },
        profileImg: { type: String },
        isActive: {
            type: String,
            enum: ['active', 'blocked'],
            required: true,
        },
    },
    {
        strict: true,
    },
);

export const StudentModel = model<Student>('Student', studentSchema);
