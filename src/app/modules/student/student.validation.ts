import Joi from 'joi';

// Define Joi schema for guardian
const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
});

// Define Joi schema for local guardian
const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
});

// Define Joi schema for userName
const userNameValidationSchema = Joi.object({
    firstname: Joi.string()
        .required()
        .trim()
        .max(20)
        .regex(/^[A-Za-z]+$/, { name: 'alphabet' })
        .message('First name should only contain alphabetical characters'),
    middlename: Joi.string(),
    lastname: Joi.string()
        .required()
        .regex(/^[A-Za-z]+$/, { name: 'alphabet' })
        .message('Last name should only contain alphabetical characters'),
});

// Define Joi schema for student
const studentValidationSchema = Joi.object({
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required(),
    presentAdress: Joi.string().required(),
    permanentAdress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
