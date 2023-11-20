import { StudentControllers } from './student.controller';
import express from 'express';

const router = express.Router();

// will call controller
router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = router;
