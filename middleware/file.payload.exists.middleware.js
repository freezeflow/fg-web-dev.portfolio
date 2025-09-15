const filePayloadExists = (req, res, next) =>{
    // Check if there is a files payload in request
    if(!req.files || !req.files.file) return res.status(400).json({success: false, message: "Missing files"});
    
    next();
};

export default filePayloadExists;