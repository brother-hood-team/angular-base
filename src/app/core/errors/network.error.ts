
import { AppError } from './app.error';

export class NetworkError extends AppError {
    constructor(error?: any, resourceName?: string) {
        super(error, resourceName);

        this.description = `Network error.Please make sure about your connection.`;
    }
}
