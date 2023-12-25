import mongoose from 'mongoose';
import QueryBuilder from '../../builders/QueryBuilder';
import { CourseSearchableField } from './course.const';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};

const getALlCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourses.course'),
        query,
    )
        .search(CourseSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await courseQuery.modelQuery;
    return result;
};

const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id);
    return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // step 1: Basic course update
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!updateBasicCourseInfo) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to update courses',
            );
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisites = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: {
                            course: { $in: deletedPreRequisites },
                        },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );

            if (!deletedPreRequisiteCourses) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    'Failed to update courses',
                );
            }

            // filter out the new course fields
            const newPreRequisites = preRequisiteCourses?.filter(
                (el) => el.course && !el.isDeleted,
            );

            const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
            });

            if (!newPreRequisitesCourses) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    'Failed to update courses',
                );
            }
        }

        await session.commitTransaction();
        await session.endSession();

        const result = await Course.findById(id).populate(
            'preRequisiteCourses.course',
        );

        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
};

const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );

    return result;
};

const assignFacultiesWithCourseIntoDB = async (
    id: string,
    payload: Partial<TCourseFaculty>,
) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } },
        },
        {
            upsert: true,
            new: true,
        },
    );

    return result;
};

const removeFacultiesFromCourseFromDB = async (
    id: string,
    payload: Partial<TCourseFaculty>,
) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: payload } },
        },
        {
            new: true,
        },
    );

    return result;
};

export const CourseServices = {
    createCourseIntoDB,
    getALlCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseFromDB,
};
