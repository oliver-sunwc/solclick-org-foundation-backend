import connection from '../tools/mysqlDatabase.js';

const tableName = 'transferTransactions';


export async function logTransferInstruction(transferAmount, sender, receiver) {
    const sqlQuery = 'INSERT INTO ' + tableName + `(transferAmount, sender, receiver) VALUES ('${transferAmount}', '${sender}', '${receiver}');`;
    console.log(sqlQuery);
    await connection.query(sqlQuery);
} //logs a transfer instruction into SQL database.

export async function getTransferEvents() {
    const sqlQuery = 'SELECT * from ' + tableName;
    const [result] = await connection.query(sqlQuery);
    return result;
} //get all transfer events from database

export async function getTransferEventByID(mintID) {
    const sqlQuery = 'SELECT * from ' + tableName + ` where id = ${mintID}`;
    const [result] = await connection.query(sqlQuery);
    return result;
} //get transfer event by ID (autoincrement in database)