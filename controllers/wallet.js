const ethers = require("ethers");
const User = require("../models/user");
const web3 = require("./walletWrapper");

let walletAddress;
let privateKey;

const walletController = async (req, res, next) => {
  console.log(req.body);
  try {
    let email = req.body.email;
    const usr = await User.findOne({ email })
    if (!usr) {
      const wallet = ethers.Wallet.createRandom();
      walletAddress = wallet.address;
      privateKey = wallet.privateKey;
      const user = new User({ email, walletAddress, privateKey });
      await user.save();
    } else {
      walletAddress = usr.walletAddress;
      privateKey = usr.privateKey;
    }
    res.status(200).send({ wallet: { address: walletAddress, privateKey: privateKey } });
  } catch (error) {
    console.log(error)
  }
};

const balance = async (req, res, next) => {
  let email = req.body.email;
  let provider = req.body.provider;
  try {
    const user = await User.findOne({email});
    if(!!user){
      //res.status(404).send("User not found");
    }
    
    console.log(user.privateKey);
    let resp = await web3.balance(user.walletAddress,user.privateKey, provider);
    console.log(resp);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error)
  }

}

const send = async (req, res, next) => {
  let amount = req.body.amount;
  let receiverwalletaddress = req.body.receiver;
  let email = req.body.email
  let provider = req.body.provider
  console.log(receiverwalletaddress);
  try {
    const user = await User.findOne({email});
    if(!!user){
      //res.status(404).send("User not found");
    }
    
    let resp = await web3.send(user.walletAddress,user.privateKey,receiverwalletaddress,amount, provider);
    console.log(resp);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error)
  }
}

// const txActivity = async (req, res, next) => {
//   let email = req.body.email;
//   try {
//     const user = await User.findOne({email});
//     if(!!user){
//       //res.status(404).send("User not found");
//     }
    
//     let resp = await web3.txActivity(user.walletAddress,user.privateKey);
//     console.log(resp);
//     res.status(200).send(resp);
//   } catch (error) {
//     console.log(error)
//   }
// }

const erc20Transfer = async (req, res, next) => {
  let email = req.body.email;
  let amount = req.body.amount;
  let receiver = req.body.receiver;
  let provider = req.body.provider;
  let tokenaddress = req.body.tokenaddress;

  try {
    const user = await User.findOne({email});
    if(!!user){
      //res.status(404).send("User not found");
    }
    
    let resp = await web3.tokenTransfer(user.walletAddress,user.privateKey,receiver,amount, provider, tokenaddress);
    console.log(resp);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error)
  }

}

const erc20Balance = async (req, res, next) => {
  let email = req.body.email;
  let provider = req.body.provider;
  let tokenaddress = req.body.tokenaddress;

  try {
    const user = await User.findOne({email});
    if(!!user){
      //res.status(404).send("User not found");
    }
    
    let resp = await web3.tokenBalance(user.walletAddress, provider, tokenaddress);
    console.log(resp);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error)
  }

}


module.exports = { walletController, balance, send, erc20Transfer, erc20Balance };