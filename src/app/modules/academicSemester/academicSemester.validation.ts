import { z } from 'zod';
import {
    AcademicSemesterCode,
    AcademicSemesterName,
    Months,
} from './academicSemester.const';

const academicSemesterValidationSchema = z.object({
    name: z.enum([...AcademicSemesterName] as [string]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string]),
    startMonth: z.enum([...Months] as [string]),
    endMonth: z.enum([...Months] as [string]),
    // body: z.object({
    //     name: z.enum([...AcademicSemesterName] as [string]),
    //     year: z.string(),
    //     code: z.enum([...AcademicSemesterCode] as [string]),
    //     startMonth: z.enum([...Months] as [string]),
    //     endMonth: z.enum([...Months] as [string]),
    // }),
});

export const AcademicSemesterValidation = {
    academicSemesterValidationSchema,
};
