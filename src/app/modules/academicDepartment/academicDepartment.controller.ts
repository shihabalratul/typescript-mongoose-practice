import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
                req.body,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Department created successfully',
            data: result,
        });
    },
);

const getAllAcademicDepartments = catchAsync(
    async (req: Request, res: Response) => {
        const academicDepartments =
            await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Departments fetched successfully',
            data: academicDepartments,
        });
    },
);

const getSingleAcademicDepartment = catchAsync(
    async (req: Request, res: Response) => {
        const { departmentId } = req.params;
        const academicDepartment =
            await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
                departmentId,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Department fetched successfully',
            data: academicDepartment,
        });
    },
);

const updateSingleAcdemicDepartment = catchAsync(
    async (req: Request, res: Response) => {
        const { departmentId } = req.params;
        const result =
            await AcademicDepartmentServices.updateSingleAcademicDepartmentIntoDB(
                departmentId,
                req.body,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Department updated successfully',
            data: result,
        });
    },
);

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateSingleAcdemicDepartment,
};
