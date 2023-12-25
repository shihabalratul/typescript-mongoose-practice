import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.services';
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course created successfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
    const Courses = await CourseServices.getALlCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses fetched successfully',
        data: Courses,
    });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const Course = await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course fetched successfully',
        data: Course,
    });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(req.body);
    const result = await CourseServices.updateCourseIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course updated successfully',
        data: result,
    });
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
    });
});

const assignFacultiesInCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
        courseId,
        faculties,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
    });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
        courseId,
        faculties,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
    });
});

export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    assignFacultiesInCourse,
    removeFacultiesFromCourse,
};
