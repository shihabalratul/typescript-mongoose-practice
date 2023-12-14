import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

// will call controller
router.post(
    '/create-academic-faculty',
    validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
    AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFacultys);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
    '/:facultyId',
    validateRequest(
        AcademicFacultyValidation.academicFacultyValidationSchema.partial(),
    ),
    AcademicFacultyController.updateSingleAcdemicFaculty,
);

export const AcademicFacultyRoutes = router;
