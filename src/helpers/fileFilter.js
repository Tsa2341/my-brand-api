export const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
<<<<<<< HEAD
};

=======
};
>>>>>>> 1643e92 (ft: add authentication and validation on required routes)
