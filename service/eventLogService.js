import { getMintEventByID, getMintEvents } from "../dao/mintDao.js";
import { getTransferEventByID, getTransferEvents } from "../dao/transferDao.js";

export async function getAllMintEvents() {
    return getMintEvents();
}

export async function getMintLogByID(eventID) {
    return getMintEventByID(eventID);
}

export async function getAllTransferEvents() {
    return getTransferEvents();
}

export async function getTransferLogByID(eventID) {
    return getTransferEventByID(eventID);
}