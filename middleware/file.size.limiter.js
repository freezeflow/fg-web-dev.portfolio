const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimitter = (req, res, next) => {
    // Get file from request
    const file = req.files && req.files.file;

    // Check if file size is over the limit
    if(file.size > FILE_SIZE_LIMIT) return res.status(413).json({success: false, message: "File size must be less than 5mb"});

    next();
};

export default fileSizeLimitter;