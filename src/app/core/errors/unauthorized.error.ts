
import { AppError } from './app.error';

export class UnAuthorizedError extends AppError {
    constructor(error?: any, resourceName?: string) {
        super(error, resourceName);

        this.description = `You are not authorised to access to this resource`;
        this.errorNumber = 401;
    }
}
