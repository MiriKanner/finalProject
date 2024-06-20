import express from 'express';
import cors from "cors";
import {logErrors} from './middleware/logError.js'
import { logActions } from './middleware/logAction.js';
import { verifyToken } from './middleware/verifyToken.js';
import { authRouter } from './router/authRouter.js';
import { albumRouter } from './router/albumRouter.js';
import { childrenRouter } from './router/childrenRouter.js';
import { itemsRouter } from './router/itemsRouter.js';

const port=process.env.PORT||8080;

const app = express();
app.use(express.json());
app.use(cors());

app.use(logActions);
app.use('/auth',authRouter);
//app.use(/*  */)
//app.use(/*  */)
// app.use(verifyToken)
app.use('/album',albumRouter)
app.use('/children',childrenRouter)
app.use('/items',itemsRouter)
app.use(logErrors);

app.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", port);
});