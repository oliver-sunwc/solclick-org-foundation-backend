import express from 'express'
import bodyParser from 'body-parser'
import { transferTokenHandler, transferTokenPOSTHandler } from '../handler/transferHandler.js'

const transferRouter = express.Router();
transferRouter.use(bodyParser.json());

transferRouter.get("/:transferAmount/:pubkey", transferTokenHandler); //deprecated, can delete
transferRouter.post("/", transferTokenPOSTHandler);

export default transferRouter;