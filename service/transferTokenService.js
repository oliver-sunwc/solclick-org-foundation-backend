import { Connection, clusterApiUrl, NonceAccount, SystemProgram, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import loadKeyPair from './loadKeypair.js';
import { logTransferInstruction } from '../dao/transferDao.js';

const mint = new PublicKey("4triyjr1wQyamYqeUEETMsX4Dsd4stGyV2vABY8TEBJs");
const multisigKey = new PublicKey("EwKPqA2Tk2WDnTyzSX67d3MoXPhq76AaeQHa9ouu43oC");
const tokenAcc = new PublicKey("PBSEQbn1qDARCB7R8TJDb5sQgPPx8eiT7AUPzohqq8U");
const noncePubkey = new PublicKey("BUstyqMrCEZn3PJaXNWtbkvgBtiARsBNkjd5oFvwRBgb");
const payer = loadKeyPair("./hot-wallets/payer.json");

//this function is deprecated and can be removed. use transferTokenPOST for token transfer.
export async function transferToken(transferAmount, recipientPubkey) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    let amount = parseInt(transferAmount) * 1000000000;

    const toPubkey = new PublicKey(recipientPubkey);
    console.log("tokey");
    console.log(toPubkey);
    
    const fromTokenAcc = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
    );

    const toTokenAcc = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        toPubkey
    );



    const signature = await transfer(
        connection,
        payer,
        fromTokenAcc.address,
        toTokenAcc.address,
        payer.publicKey,
        amount
    );

    logTransferInstruction(transferAmount, payer.publicKey, recipientPubkey);

    return {'transferred': transferAmount}
}

export async function transferTokenPOST(json) {

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const body = json.body;

    for(let i = 0; i < body.length; i++) { //executes each transaction in the JSON post data. TODO: Update to run the transactions as batches.
        let obj = body[i];
        let amount = parseInt(obj.transferAmount) * 1000000000;
        let toPubkey = new PublicKey(obj.transferPubkey);

        console.log(amount);
        console.log(toPubkey);

        const fromTokenAcc = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            payer.publicKey
        );
    
        const toTokenAcc = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            toPubkey
        );
    
    
    
        const signature = await transfer(
            connection,
            payer,
            fromTokenAcc.address,
            toTokenAcc.address,
            payer.publicKey,
            amount
        );

        logTransferInstruction(obj.transferAmount, payer.publicKey, obj.transferPubkey);
        console.log('posted');
    }
}