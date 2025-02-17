import connection from '../tools/mysqlDatabase.js';

const tableName = 'mintTransactions';


export async function logMintInstruction(mintAmount, signer1Pubkey, signer2Pubkey) {
    const sqlQuery = 'INSERT INTO ' + tableName + `(mintAmount, signer1, signer2) VALUES ('${mintAmount}', '${signer1Pubkey}', '${signer2Pubkey}');`;
    console.log(sqlQuery);
    await connection.query(sqlQuery);
}

export async function getMintEvents() { //gets all mint events in the sql database
    const sqlQuery = 'SELECT * from ' + tableName;
    const [result] = await connection.query(sqlQuery);
    return result;
}

export async function getMintEventByID(mintID) { //gets any mint event in sql database from its ID
    const sqlQuery = 'SELECT * from ' + tableName + ` where id = ${mintID}`;
    const [result] = await connection.query(sqlQuery);
    return result;
}