class AppError extends Error {
    constructor({ message, status = 500 }) {
        super(message);
        this.status = status;
        this.name = this.constructor.name; // Optional: sets name to "AppError"
        Error.captureStackTrace(this, this.constructor); // Cleaner stack trace
    }
}

export default AppError;
