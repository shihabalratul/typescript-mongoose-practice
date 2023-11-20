import { Request, Response } from 'express';
import { StudentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;

        // will call service function to send this data
        const result = await StudentServices.createStudentIntoDB(studentData);

        //  send response
        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
        console.log(err);
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentFromDB();
        res.status(200).json({
            success: true,
            message: 'Students are fetched successfully',
            data: {
                students: result,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
        console.log(err);
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'Student fetched successfully',
            data: {
                student: result,
            },
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
