import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interfaces/error';

// handler for zod error
export const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const statusCode = 400;

    const errorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });

    return {
        statusCode,
        message: 'Validation error',
        errorSources,
    };
};
