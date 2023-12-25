/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentServices } from './student.services';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
    // console.log(req.query);

    const result = await StudentServices.getAllStudentFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students retrived successfully!',
        data: result,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student retrieved successfully!',
        data: result,
    });
});

const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentServices.updateStudentIntoDB(id, student);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student updated successfully!',
        data: result,
    });
});

const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);

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
    updateStudent,
};
