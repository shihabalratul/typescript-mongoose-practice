import { Schema, model } from 'mongoose';

import { TAcademicSemester } from './academicSemester.interface';
import {
    AcademicSemesterCode,
    AcademicSemesterName,
    Months,
} from './academicSemester.const';

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            required: true,
            enum: AcademicSemesterName,
        },
        code: {
            type: String,
            required: true,
            enum: AcademicSemesterCode,
        },
        year: {
            type: String,
            required: true,
        },

        startMonth: {
            type: String,
            required: true,
            enum: Months,
        },
        endMonth: {
            type: String,
            required: true,
            enum: Months,
        },
    },
    {
        timestamps: true,
    },
);

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        name: this.name,
        year: this.year,
    });

    if (isSemesterExists) {
        throw new Error('Semester already exists');
    }

    next();
});

export const AcademicSemester = model<TAcademicSemester>(
    'AcademicSemester',
    academicSemesterSchema,
);
