import express from 'express'
import bodyParser from 'body-parser'
import { getAllMintEventsHandler, getAllTransferEventsHandler, getMintLogByIDHandler, getTransferLogByIDHandler } from '../handler/eventLogHandler.js';
import { getTransferLogByID } from '../service/eventLogService.js';

const eventRouter = express.Router();
eventRouter.use(bodyParser.json());

eventRouter.get("/mint", getAllMintEventsHandler);
eventRouter.get("/mint/:eventID", getMintLogByIDHandler);
eventRouter.get("/transfer", getAllTransferEventsHandler); 
eventRouter.get("/transfer/:eventID", getTransferLogByIDHandler);

export default eventRouter;