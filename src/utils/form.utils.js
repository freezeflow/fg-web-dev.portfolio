export class formUtility{

    isFormComplete(form) {
        if (!form || typeof form !== 'object') {
            return false;
        }
        for (const key in form) {
            if (form.hasOwnProperty(key)) {
                const value = form[key];
                if (value === null || value === undefined || value === '') {
                    return false;
                }
            }
        }
        return true;
    }

    isFileExtensionValid(file, allowedExtensions = []) {
        if (!file || !file.name) return false;
        const ext = file.name.split('.').pop().toLowerCase();
        return allowedExtensions.map(e => e.toLowerCase()).includes(ext);
    }

    // Checks if the file size is within the limit (maxSizeMB in megabytes)
    isFileSizeValid(file, maxSizeMB) {
        if (!file || typeof file.size !== 'number') return false;
        const sizeMB = file.size / (1024 * 1024);
        return sizeMB <= maxSizeMB;
    }
    
    isEmailValid(email) {
        if (typeof email !== 'string') return false;
        // Simple regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}