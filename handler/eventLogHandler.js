import { getAllMintEvents, getMintLogByID } from "../service/eventLogService.js";
import { getAllTransferEvents, getTransferLogByID } from "../service/eventLogService.js";

export async function getAllMintEventsHandler(req, res) { //get all mint events
    try {
        const mess = await getAllMintEvents();
        res.status(201).send(mess);
    } catch(error) {
        res.status(400).send({error: error.message}); 
    }
}

export async function getMintLogByIDHandler(req, res) { //get mint event by ID
    try {
        const mess = await getMintLogByID(req.params.eventID);
        res.status(201).send(mess);
    } catch(error) {
        res.status(400).send({error: error.message});
    }
}

export async function getAllTransferEventsHandler(req, res) { //get all transfer events
    try {
        const mess = await getAllTransferEvents();
        res.status(201).send(mess);
    } catch(error) {
        res.status(400).send({error: error.message});
    }
}

export async function getTransferLogByIDHandler(req, res) { //get transfer event by ID
    try {
        const mess = await getTransferLogByID(req.params.eventID);
        res.status(201).send(mess);
    } catch(error) {
        res.status(400).send({error: error.message});
    }
}