const EthUtil = require('ethereumjs-util');
const web3 = require('web3');

/*   signature      */



// pub key 0x4E10BAe7A6f21E925bd9ffd94271e05aB6aE237a
let pKey = "09e9675dd178a2ae923d406db9a199ec1cb107d26cd22d5dfa56a4a9adbd60ae";

// buffer 
let pKeyBuff = new Buffer(pKey,'hex');

// the message 
let message ="Elichai";

// hash the message 
let messageHash = web3.utils.sha3(message);
// remove the 0x and turn to buffer 
var messageBuff = new Buffer(messageHash.substring(2), "hex"); 
// sign 
//contains  r, s, v 
let signedMessage = EthUtil.ecsign(messageBuff,pKeyBuff);
console.log("pre parse:P " + JSON.stringify(signedMessage));
// hash of the sig to send over web (RPC SIG)
let signedHash = EthUtil.toRpcSig(signedMessage.v,signedMessage.r,signedMessage.s).toString("hex");



/*  verify sig    */ 

let sigDecoded = EthUtil.fromRpcSig(signedHash);

let revocerdPub = EthUtil.ecrecover(messageBuff, sigDecoded.v,sigDecoded.r,sigDecoded.s);

// THE public key in hex representation
let recoverAddress = EthUtil.pubToAddress(revocerdPub).toString("hex");
