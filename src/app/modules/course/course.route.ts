import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

// will call controller
router.post(
    '/create-course',
    validateRequest(CourseValidation.createCourseValidationSchema),
    CourseController.createCourse,
);

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);
router.delete('/:id', CourseController.deleteCourse);

router.patch(
    '/:id',
    validateRequest(CourseValidation.updateCourseValidationSchema.partial()),
    CourseController.updateCourse,
);

router.put(
    '/:courseId/assign-faculties',
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseController.assignFacultiesInCourse,
);

router.delete(
    '/:courseId/remove-faculties',
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseController.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
