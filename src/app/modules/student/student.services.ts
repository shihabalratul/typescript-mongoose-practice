import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
    // Built in static method
    // const result = await StudentModel.create(studentData);

    if (await Student.isUserExists(studentData.email)) {
        throw new Error('User already exists!');
    }

    // Built in static method
    const result = await Student.create(studentData);

    // Built in instance method
    // const student = new Student(studentData); // create and instance
    // const result = await student.save();

    return result;
};

const getAllStudentFromDB = async () => {
    const result = await Student.find();

    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findById(id);

    return result;
};

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB,
};
