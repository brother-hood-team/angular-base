
import { AppError } from './app.error';

export class BadRequestError extends AppError {
    constructor(error?: any, resourceName?: string) {
        super(error, resourceName);

        this.description = `This is not a valid request. Please make sure the request is valid and try again.`;
        this.errorNumber = 400;
    }
}
