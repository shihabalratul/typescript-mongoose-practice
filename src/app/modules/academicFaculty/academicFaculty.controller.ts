import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Faculty created successfully',
            data: result,
        });
    },
);

const getAllAcademicFacultys = catchAsync(
    async (req: Request, res: Response) => {
        const academicFacultys =
            await AcademicFacultyServices.getAllAcademicFacultysFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Facultys fetched successfully',
            data: academicFacultys,
        });
    },
);

const getSingleAcademicFaculty = catchAsync(
    async (req: Request, res: Response) => {
        const { facultyId } = req.params;
        const academicFaculty =
            await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
                facultyId,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Faculty fetched successfully',
            data: academicFaculty,
        });
    },
);

const updateSingleAcdemicFaculty = catchAsync(
    async (req: Request, res: Response) => {
        const { facultyId } = req.params;
        const result =
            await AcademicFacultyServices.updateSingleAcademicFacultyIntoDB(
                facultyId,
                req.body,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Faculty updated successfully',
            data: result,
        });
    },
);

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFacultys,
    getSingleAcademicFaculty,
    updateSingleAcdemicFaculty,
};
