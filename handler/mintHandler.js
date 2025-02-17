import { mintToken, mintTokenInstruction } from "../service/mintTokenService.js";

export async function mintTokenInstructionHandler(req, res) {
    try {
        const mess = await mintTokenInstruction(req.params.mintAmount, req.params.signer1Pubkey, req.params.signer2Pubkey);
        console.log(mess);
        res.status(201).send(mess); //returns the copy-pasted instruction for mintToken
    } catch(error) {
        res.status(400).send({error: error.message});
    }
} 

export async function mintTokenHandler(req, res) {
    try {
        const mess = await mintToken(req.params.mintAmount, req.params.signer1Pubkey, req.params.signer2Pubkey, req.params.sig1, req.params.sig2);
        console.log(mess);
        res.status(201).send(mess); //returns the copy-paste command for minting new tokens WITH signature
    } catch(error) {
        res.status(400).send({error: error.message});
    } 
}