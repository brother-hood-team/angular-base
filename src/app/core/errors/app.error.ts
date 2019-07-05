export abstract class AppError {
    constructor(error?: any, resourceName?: string) {
    }
    description: string;
    errorNumber: number;
}
