import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";

const GenesisHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

interface User {
  readonly ipaddr: String;
  readonly name: String;
}

interface Transaction {
  readonly timestamp: Number;
  readonly user: User;
  readonly data: String;
  readonly hashdigest: String;
}

interface Block {
  readonly prevBlockHash: String;
  readonly transactions: Map<String, Transaction>;
  readonly currBlockHash: string;
}

interface Blockchain {
  blockTransactLimit: Number;
  blocks: Map<String, Block>;
}

let BlockChainDSC: Blockchain = {
  blockTransactLimit: 20,
  blocks: new Map()
}

const nonce = (length: Number) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const makeUser = (ipaddr: String, name: String): User => ({
  name: name,
  ipaddr: ipaddr
});

export const makeTransaction = (user: User, data: String): Transaction => {
  const dateObj = new Date();
  const timestamp = dateObj.getDate();
  let transaction = {
    timestamp: timestamp,
    user: user,
    data: data,
    hashdigest: ""
  };
  const hashdigest = sha256(nonce(64) + JSON.stringify(transaction));
  transaction["hashdigest"] = hashdigest.toString(CryptoJS.enc.Hex);
  return transaction;
};

export const makeBlock = (prevBlockHash: String, transactions: Map<String, Transaction>): Block => {
  let block = {
    prevBlockHash: prevBlockHash,
    transactions: transactions,
    currBlockHash: ""
  };
  const hashdigest = sha256(nonce(64) + JSON.stringify(block));
  block["currBlockHash"] = hashdigest.toString(CryptoJS.enc.Hex);
  return block;
}