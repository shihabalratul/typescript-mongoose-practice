import { validateRequest } from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import express from 'express';
import { studentValidations } from './student.validation';

const router = express.Router();

// will call controller
router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch(
    '/:id',
    validateRequest(studentValidations.updateStudentValidationSchema),
    StudentControllers.updateStudent,
);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
