import express from 'express';
import cors from "cors";
import {logErrors} from './middleware/logError.js'
import { logActions } from './middleware/logAction.js';
import { verifyToken } from './middleware/verifyToken.js';
import { authRouter } from './router/authRouter.js';
import { albumRouter } from './router/albumRouter.js';
import { childrenRouter } from './router/childrenRouter.js';
import { itemsRouter } from './router/itemsRouter.js';

import multer  from "multer";



const port=process.env.PORT||8080;
console.log('starting handling request' )
const app = express();
app.use(express.json());
app.use(cors());
app.use(logActions);
app.use('/auth',authRouter);
//app.use('/item')

//app.use(/*  */)
//app.use(/*  */)
// app.use(verifyToken)
app.use('/album',albumRouter)
app.use('/children',childrenRouter)
app.use('/items',itemsRouter)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.use(logErrors);
console.log('finish handling request')

app.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", port);
});