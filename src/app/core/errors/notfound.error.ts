
import { AppError } from './app.error';

export class NotFoundError extends AppError {
    constructor(error?: any, resourceName?: string) {
        super(error, resourceName);

        this.description = `The resource you are looking not exist`;
        this.errorNumber = 404;
    }
}
