import { Student } from './student.model';
import mongoose from 'mongoose';

const getAllStudentFromDB = async () => {
    const result = await Student.find();

    return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
    const id = new mongoose.Types.ObjectId(studentId);
    const result = await Student.aggregate([{ $match: { _id: id } }]);

    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const result = await Student.updateOne({ _id: id }, { isDeleted: true });

    return result;
};

export const StudentServices = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
};
