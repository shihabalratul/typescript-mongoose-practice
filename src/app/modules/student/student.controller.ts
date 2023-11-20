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

export const StudentControllers = {
    createStudent,
};
