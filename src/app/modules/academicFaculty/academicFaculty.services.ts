import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const isFacultyExists = await AcademicFaculty.findOne({
        name: payload.name,
    });

    if (isFacultyExists) {
        throw new Error('Department already exists');
    }

    const result = await AcademicFaculty.create(payload);

    return result;
};

const getAllAcademicFacultysFromDB = async () => {
    const result = await AcademicFaculty.find();

    return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);

    return result;
};

const updateSingleAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFaculty>,
) => {
    const result = await AcademicFaculty.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );

    return result;
};

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultysFromDB,
    getSingleAcademicFacultyFromDB,
    updateSingleAcademicFacultyIntoDB,
};
