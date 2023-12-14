import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// will call controller
router.post(
    '/create-academic-semester',
    validateRequest(
        AcademicSemesterValidation.academicSemesterValidationSchema,
    ),
    AcademicSemesterController.createAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);
router.get(
    '/:semesterId',
    AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
    '/:semesterId',
    validateRequest(
        AcademicSemesterValidation.academicSemesterValidationSchema.partial(),
    ),
    AcademicSemesterController.updateSingleAcdemicSemester,
);

export const AcademicSemesterRoutes = router;
