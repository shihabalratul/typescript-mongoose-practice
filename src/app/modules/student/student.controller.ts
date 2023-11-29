/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentServices } from './student.services';
import httpStatus from 'http-status';
import sendResponse from '../../utils/serndResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students retrived successfully!',
        data: result,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student retrieved successfully!',
        data: result,
    });
});

const deleteStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student deleted successfully!',
        data: result,
    });
});

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};
