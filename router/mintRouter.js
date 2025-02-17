import express from 'express'
import bodyParser from 'body-parser'
import { mintTokenHandler, mintTokenInstructionHandler } from '../handler/mintHandler.js'

const mintRouter = express.Router();
mintRouter.use(bodyParser.json());

mintRouter.get("/mintToken/mintAmount/:mintAmount/signer1/:signer1Pubkey/signer2/:signer2Pubkey", mintTokenInstructionHandler);
mintRouter.get("/mintToken/mintAmount/:mintAmount/signer1/:signer1Pubkey/signer2/:signer2Pubkey/sig1/:sig1/sig2/:sig2", mintTokenHandler);

export default mintRouter;