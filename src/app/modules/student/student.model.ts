import { Schema, model } from 'mongoose';
import {
    // StudentMethod,
    StudentModel,
    TGuardian,
    TLocalGuardian,
    TStudent,
    TUserName,
} from './student.interface';
import validator from 'validator';

const guardianSchema = new Schema<TGuardian>(
    {
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
    },
    {
        _id: false,
    },
);

const localGuardianSchema = new Schema<TLocalGuardian>(
    {
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
    },
    {
        _id: false,
    },
);

const userNameSchema = new Schema<TUserName>(
    {
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
    },
    {
        _id: false,
    },
);

const studentSchema = new Schema<TStudent, StudentModel>({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
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
        type: Date,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
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
    admissionSemester: {
        type: Schema.Types.ObjectId,
        required: [true, 'Admission semester is required'],
        ref: 'AcademicSemester',
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: [true, 'Academic department is required'],
        ref: 'AcademicDepartment',
    },
    isDeleted: {
        type: Boolean,
    },
});

// query middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({
        $match: {
            isDeleted: { $ne: true },
        },
    });
    console.log(this.pipeline());
    next();
});

// Creating a custom static method
studentSchema.statics.isUserExists = async function (email: string) {
    const existingUser = await Student.findOne({ email });
    return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
