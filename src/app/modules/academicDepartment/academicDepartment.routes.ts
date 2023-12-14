import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

// will call controller
router.post(
    '/create-academic-department',
    // validateRequest(
    //     AcademicDepartmentValidation.academicDepartmentValidationSchema,
    // ),
    AcademicDepartmentController.createAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);
router.get(
    '/:departmentId',
    AcademicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
    '/:departmentId',
    validateRequest(
        AcademicDepartmentValidation.academicDepartmentValidationSchema.partial(),
    ),
    AcademicDepartmentController.updateSingleAcdemicDepartment,
);

export const AcademicDepartmentRoutes = router;
