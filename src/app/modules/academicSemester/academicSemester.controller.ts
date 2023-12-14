import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemester } from './academicSemester.model';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await AcademicSemesterServices.createAcademicSemesterIntoDB(
                req.body,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic semester created successfully',
            data: result,
        });
    },
);

const getAllAcademicSemesters = catchAsync(
    async (req: Request, res: Response) => {
        const academicSemesters =
            await AcademicSemesterServices.getAllAcademicSemestersFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic semesters fetched successfully',
            data: academicSemesters,
        });
    },
);

const getSingleAcademicSemester = catchAsync(
    async (req: Request, res: Response) => {
        const { semesterId } = req.params;
        const academicSemester =
            await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
                semesterId,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic semester fetched successfully',
            data: academicSemester,
        });
    },
);

const updateSingleAcdemicSemester = catchAsync(
    async (req: Request, res: Response) => {
        const { semesterId } = req.params;
        const result =
            await AcademicSemesterServices.updateSingleAcdemicSemesterIntoDB(
                semesterId,
                req.body,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic semester updated successfully',
            data: result,
        });
    },
);

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateSingleAcdemicSemester,
};
