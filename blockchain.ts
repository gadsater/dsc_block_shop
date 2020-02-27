import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";
import * as _ from "lodash";

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

const makeUser = (ipaddr: String, name: String): User => ({
  name: name,
  ipaddr: ipaddr
});

const makeTransaction = (user: User, data: String): Transaction => {
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

const makeBlock = (prevBlockHash: String, transactions: Map<String, Transaction>): Block => {
  const hashdigest = sha256(nonce(64) + JSON.stringify(transactions));
  let block: Block = {
    prevBlockHash: prevBlockHash,
    transactions: transactions
  };
  return block;
}