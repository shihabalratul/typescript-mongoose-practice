import { StudentControllers } from './student.controller';
import express from 'express';

const router = express.Router();

// will call controller
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
