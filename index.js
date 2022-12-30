const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {walletController, balance, send, erc20Transfer, erc20Balance} = require("./controllers/wallet.js");
const { txActivity } = require("./controllers/walletWrapper.js");
const connectionString = "mongodb+srv://admin:admin@cluster0.7iqkmon.mongodb.net/custodialWalletDb?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

app.use(cors({ origin: "https://crypto-transfer-alpha.vercel.app", credentials: true }));


app.post("/wallet",walletController);
app.post("/balance", balance);
app.post("/send",send);
// app.post("/txActivity",txActivity);
app.post("/tknTransfer", erc20Transfer);
app.post("/tokenBalance", erc20Balance);


mongoose.connect(connectionString, (err) => {
    if (err) {
      return;
    }
    app.listen(3002, () => {
      console.log("Server Connected!!");
    });
  });