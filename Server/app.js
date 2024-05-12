import express from 'express';
import cors from "cors";

// import { userRouter } from './router/userRouter.js'
// import { postRouter } from './router/postRouter.js'
// import {todoRouter} from './router/todoRouter.js'
// import {commentRouter} from './router/commentRouter.js'
// import { authRouter } from './router/authRouter.js';
// import {logErrors} from './middleware/logError.js'
console.log('starting handling request' )
const app = express();
app.use(express.json());
app.use(cors());
// app.use('/user', userRouter);
// app.use('/todo', todoRouter);
// app.use('/post', postRouter);
// app.use('/comment', commentRouter);
// app.use('/login', authRouter);
// app.use(logErrors);
console.log('finish handling request')

app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});