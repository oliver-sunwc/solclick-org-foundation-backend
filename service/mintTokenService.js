import { Connection, clusterApiUrl, NonceAccount, SystemProgram } from '@solana/web3.js'
import loadKeyPair from './loadKeypair.js'
import { PublicKey } from '@solana/web3.js'
import { logMintInstruction } from '../dao/mintDao.js';

const mint = new PublicKey("4triyjr1wQyamYqeUEETMsX4Dsd4stGyV2vABY8TEBJs"); //identifier for our $CLICK token
const multisigKey = new PublicKey("EwKPqA2Tk2WDnTyzSX67d3MoXPhq76AaeQHa9ouu43oC"); //identifier for our multisignature hardware wallet
const tokenAcc = new PublicKey("PBSEQbn1qDARCB7R8TJDb5sQgPPx8eiT7AUPzohqq8U"); //$CLICK wallet address for our staging airdrop wallet
const noncePubkey = new PublicKey("BUstyqMrCEZn3PJaXNWtbkvgBtiARsBNkjd5oFvwRBgb"); //pubkey for our durable nonce wallet
const payer = loadKeyPair("./hot-wallets/payer.json"); //private key for staging airdrop wallet

export async function mintTokenInstruction(mintAmount, signer1Pubkey, signer2Pubkey) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const nonceAccountInfo = await connection.getAccountInfo(
        noncePubkey,
        'confirmed',
    );

    const nonceAccountFromInfo = NonceAccount.fromAccountData(nonceAccountInfo.data);


    const nonceInstruction = SystemProgram.nonceAdvance({
        authorizedPubkey: payer.publicKey,
        noncePubkey: noncePubkey
    });

    const nonce = nonceAccountFromInfo.nonce;

    const cmdInstruction = "spl-token mint " + mint + " " + mintAmount + " " + tokenAcc + " --owner " + multisigKey + 
    " --multisig-signer " + signer1Pubkey + 
    " --multisig-signer " + signer2Pubkey + 
    " --blockhash " + nonce + " --fee-payer " + 
    payer.publicKey + " --nonce " +  //payer.pubkey is the pubkey address of the payer.json keypair in hot-wallets
    noncePubkey + " --nonce-authority " +  
    payer.publicKey + " --sign-only --mint-decimals 9";

    return {'instruction': cmdInstruction};
}

//same function as above but removes the --sign-only and adds the signatures
export async function mintToken(mintAmount, signer1Pubkey, signer2Pubkey, signer1Signature, signer2Signature) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const nonceAccountInfo = await connection.getAccountInfo(
        noncePubkey,
        'confirmed',
    );

    const nonceAccountFromInfo = NonceAccount.fromAccountData(nonceAccountInfo.data);


    const nonceInstruction = SystemProgram.nonceAdvance({
        authorizedPubkey: payer.publicKey,
        noncePubkey: noncePubkey
    });

    const nonce = nonceAccountFromInfo.nonce;

    const cmdInstruction = "spl-token mint " + mint + " " + mintAmount + " " + tokenAcc + " --owner " + multisigKey + 
    " --multisig-signer " + signer1Pubkey + 
    " --multisig-signer " + signer2Pubkey + 
    " --blockhash " + nonce + " --fee-payer payer.json --nonce " + 
    noncePubkey + " --nonce-authority payer.json --mint-decimals 9 --signer " +
    signer1Signature + " --signer " + signer2Signature;

    logMintInstruction(mintAmount, signer1Pubkey, signer2Pubkey);
    
    return {'instruction': cmdInstruction};
}
