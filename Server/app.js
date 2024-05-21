import express from 'express';
import cors from "cors";
import {logErrors} from './middleware/logError.js'
import { logActions } from './middleware/logAction.js';
import { verifyToken } from './middleware/verifyToken.js';
import { authRouter } from './router/authRouter.js';
const port=process.env.PORT||8080;
console.log('starting handling request' )
const app = express();
app.use(express.json());
app.use(cors());
app.use(logActions);
app.use('/auth',authRouter);
app.use(verifyToken)
app.use(logErrors);
console.log('finish handling request')

app.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", port);
});