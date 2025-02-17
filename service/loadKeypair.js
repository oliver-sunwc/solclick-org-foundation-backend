import { Keypair } from '@solana/web3.js';
import fs from 'fs';

//this function loads a keypair JSON file into a web3.js Keypair object.
export default function loadKeyPair(filepath) {
  const idJsonText = fs.readFileSync(filepath, 'utf-8');
  const idJson = JSON.parse(idJsonText);

  const privateKey = Buffer.from(idJson, 'base64');
  const keyPair = Keypair.fromSecretKey(privateKey);
  return keyPair;
}