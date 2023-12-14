/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    // Use regex to extract the value within double quotes
    const match = err.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists.`,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: `${extractedMessage} is already exists.`,
        errorSources,
    };
};

export default handleDuplicateError;
