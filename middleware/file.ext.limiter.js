import path from 'path';

const fileExtLimiter = (allowedExtArray) => {
    // Return function that checks for file extensions that match an extension in the allowedExtArray
    return (req, res, next) => {
        // Get file
        const file = req.files && req.files.file;

        // Get file extension
        const fileExtension = path.extname(file.name)

        // Check if the file extension is allowed
        const allowed = allowedExtArray.includes(fileExtension);

        if(!allowed) return res.status(422).json({success: false, message: `Upload failed. Only ${allowedExtArray.toString()} files allowed` .replaceAll(",", ", ")});

        next();
    }
}

export default fileExtLimiter