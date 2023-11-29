/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserServices } from './user.services';
import sendResponse from '../../utils/serndResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;

    // data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // const zodparsedData = studentValidationSchema.parse(studentData);

    // will call service function to send this data
    const result = await UserServices.createStudentIntoDB(
        password,
        studentData,
    );

    //  send response
    // res.status(200).json({
    //     success: true,
    //     message: 'Student created successfully',
    //     data: result,
    // });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully!',
        data: result,
    });
});

export const UserControllers = {
    createStudent,
};
