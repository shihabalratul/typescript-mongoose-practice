import { Schema, model } from 'mongoose';
import {
    Guardian,
    LocalGuardian,
    Student,
    UserName,
} from './student.interface';
import validator from 'validator';

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
    firstname: {
        type: 'string',
        required: true,
        trim: true,
        maxlength: [20, 'First name cannot more than 20 characters'],
    },
    middlename: { type: 'string' },
    lastname: {
        type: 'string',
        required: true,
    },
});

const studentSchema = new Schema<Student>({
    name: {
        type: userNameSchema,
        required: [true, 'Please provide a name'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message:
                '{VALUE} is not a valid gender. Gender can only be one of the followings: "male", "female"',
        },
        required: [true, 'Please select a gender'],
    },
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        // unique: true,
        message:
            '{VALUE} email address is already registered. Please use a different email address',
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'Email is not valid',
        },
    },
    contactNo: {
        type: String,
        required: [true, 'Please provide a contact number'],
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Please provide an emergency contact number'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message:
                '{VALUE} is not a valid blood group. Please select a valid blood group from the available options',
        },
        required: [true, 'Please select a blood group'],
    },
    presentAdress: {
        type: String,
        required: [true, 'Please provide a present address'],
    },
    permanentAdress: {
        type: String,
        required: [true, 'Please provide a permanent address'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Please provide guardian details'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Please provide local guardian details'],
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: {
            values: ['active', 'blocked'],
            message:
                '{VALUE} is not a valid status. Status can only be one of the followings: "active", "blocked"',
        },
        default: 'active',
    },
});

export const StudentModel = model<Student>('Student', studentSchema);
