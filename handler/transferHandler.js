import { transferToken, transferTokenPOST } from "../service/transferTokenService.js";

export async function transferTokenHandler(req, res) {
    try {
        const mess = await transferToken(req.params.transferAmount, req.params.pubkey);
        console.log(mess);
        res.status(201).send(mess);
        //post
    } catch(error) {
        res.status(400).send({error: error.message});
    }
}

export async function transferTokenPOSTHandler(req, res) {
    try {
        const { body } = req;
        await transferTokenPOST(req);
        res.status(201).send({message: "complete"});
    } catch(error) {
        res.status(400).send({error: error.message});
    }
}