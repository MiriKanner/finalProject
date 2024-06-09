import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'uploads/');
    },
    filename: function (req, file, next) {
        next(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
export default upload
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ message: 'File uploaded successfully' });
// });