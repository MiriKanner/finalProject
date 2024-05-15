import express from 'express';
import cors from "cors";
import {logErrors} from './middleware/logError.js'

const port=process.env.PORT||8080;
console.log('starting handling request' )
const app = express();
app.use(express.json());
app.use(cors());

app.use(logErrors);
console.log('finish handling request')

app.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", port);
});