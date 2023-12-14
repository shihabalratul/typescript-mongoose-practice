import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();

    const isDepartmentExists = await AcademicFaculty.findOne({
        query,
    });

    if (!isDepartmentExists) {
        throw new Error('Faculty does not exists!');
    }
    next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
    'AcademicFaculty',
    academicFacultySchema,
);
