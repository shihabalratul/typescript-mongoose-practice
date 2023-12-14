import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Student } from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
    const queryObj = { ...query };

    const searceableFields = [
        'email',
        'name.firstname',
        'name.lastname',
        'presentAddress',
    ];

    let searchTerm = '';

    if (query?.searchTerm) {
        searchTerm = query?.searchTerm as string;
    }

    const searchQuery = Student.find({
        $or: searceableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    console.log({ query, queryObj });

    const filterQuery = searchQuery
        .find(queryObj)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    let sort = '-createdAt';

    if (query.sort) {
        sort = query.sort as string;
    }

    const sortQuery = filterQuery.sort(`field ${sort}`);

    let page = 1;
    let limit = 1;
    let skip = 0;

    if (query.limit) {
        limit = Number(query.limit);
    }

    if (query.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }

    const paginateQuery = sortQuery.skip(skip);

    const limitQuery = paginateQuery.limit(limit);

    let fields = '-__v';

    if (query.fields) {
        fields = (query.fields as string).split(',').join(' ');
    }

    const selectQuery = await limitQuery.select(fields);

    return selectQuery;
};

const getSingleStudentFromDB = async (studentId: string) => {
    const id = new mongoose.Types.ObjectId(studentId);
    const result = await Student.findOne({ id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    return result;
};

const updateStudentIntoDB = async (
    studentId: string,
    payload: Partial<TStudent>,
) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    console.log(modifiedUpdatedData);
    const result = await Student.findOneAndUpdate(
        { id: studentId },
        modifiedUpdatedData,
        { new: true, runValidators: true },
    );

    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const student = await Student.findOne({ id });

    if (!student) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Student does not exists!');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const deletedStudent = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            {
                new: true,
                session,
            },
        );

        if (!deletedStudent) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete student',
            );
        }

        const deletedUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            {
                new: true,
                session,
            },
        );

        if (!deletedUser) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete student',
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete student');
    }
};

export const StudentServices = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB,
};
