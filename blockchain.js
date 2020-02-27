"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var sha256_1 = __importDefault(require("crypto-js/sha256"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var GenesisHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
var BlockChainDSC = {
    blockTransactLimit: 20,
    blocks: new Map()
};
var nonce = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
var makeUser = function (ipaddr, name) { return ({
    name: name,
    ipaddr: ipaddr
}); };
var makeTransaction = function (user, data) {
    var dateObj = new Date();
    var timestamp = dateObj.getDate();
    var transaction = {
        timestamp: timestamp,
        user: user,
        data: data,
        hashdigest: ""
    };
    var hashdigest = sha256_1["default"](nonce(64) + JSON.stringify(transaction));
    transaction["hashdigest"] = hashdigest.toString(crypto_js_1["default"].enc.Hex);
    return transaction;
};
var makeBlock = function (prevBlockHash, transactions) {
    var block = {
        prevBlockHash: prevBlockHash,
        transactions: transactions
    };
    return block;
};
