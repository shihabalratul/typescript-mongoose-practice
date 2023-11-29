import { z } from 'zod';

const guardianValidationSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
});

const userNameValidationSchema = z.object({
    firstname: z
        .string()
        .regex(/^[^\d]*$/, 'Firstname can obly have Alphabetical Charecter')
        .max(20),
    middlename: z
        .string()
        .regex(/^[^\d]*$/, 'Middlename can obly have Alphabetical Charecter')
        .max(20)
        .optional(),
    lastname: z
        .string()
        .regex(/^[^\d]*$/, 'Lastname can obly have Alphabetical Charecter')
        .max(20),
});

const studentValidationSchema = z.object({
    name: userNameValidationSchema,
    password: z.string(),
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string().optional(),
    email: z.string().email(), // You can add custom validation for email
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAdress: z.string(),
    permanentAdress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean(),
});

export default studentValidationSchema;
