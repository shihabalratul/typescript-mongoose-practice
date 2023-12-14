import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Academic Department must be a string',
        required_error: 'Name is  required',
    }),
    academicFaculty: z.string({
        invalid_type_error: 'Academic Faculty must be string',
        required_error: 'Academic Faculty is required',
    }),
});

export const AcademicDepartmentValidation = {
    academicDepartmentValidationSchema,
};
