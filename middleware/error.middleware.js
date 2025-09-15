const errorHandler = (err, req, res, next) => {
    // Log everything in dev
    console.error('Error stack:', err.stack || err);
    
    // Detect AppError or fallback
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || "Internal server error";

    const response = {
        success: false,
        message,
    };

    // Optional: send error name/type in dev mode
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
        response.errorType = err.name || "Error";
    }

    res.status(statusCode).json(response);
};

export default errorHandler;
