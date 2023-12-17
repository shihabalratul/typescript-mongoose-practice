import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

const userNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20),
    middleName: z.string().max(20),
    lastName: z.string().max(20),
});

export const createAdminValidationSchema = z.object({
    password: z.string().max(20),
    admin: z.object({
        designation: z.string(),
        name: userNameValidationSchema,
        gender: z.enum([...Gender] as [string, ...string[]]),
        dateOfBirth: z.string().optional(),
        email: z.string().email(),
        contactNo: z.string(),
        emergencyContactNo: z.string(),
        bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        profileImg: z.string(),
    }),
});

export const updateAdminValidationSchema = z.object({
    body: z.object({
        admin: z.object({
            name: userNameValidationSchema.partial(),
            designation: z.string().max(30).optional(),
            gender: z.enum([...Gender] as [string, ...string[]]).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloogGroup: z
                .enum([...BloodGroup] as [string, ...string[]])
                .optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            profileImg: z.string().optional(),
        }),
    }),
});

export const AdminValidations = {
    createAdminValidationSchema,
    updateAdminValidationSchema,
};
