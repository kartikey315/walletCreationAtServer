const ethers = require("ethers");
const axios = require("axios");
const balance = async (walletAddress, privateKey, provider) => {
    
    const provider1 = new ethers.providers.JsonRpcProvider(provider);
    const wallet = new ethers.Wallet(privateKey, provider1);
    let total_balance = await wallet.getBalance();
    total_balance = ethers.utils.formatUnits(total_balance, 18).toString();
    //console.log('Wallet balance is:', total_balance);
    return total_balance;

}

const send = async (walletAddress, privateKey, receiverwalletaddress, amount, provider) => {
    
    const provider1 = new ethers.providers.JsonRpcProvider(provider);
    console.log('receiver:',receiverwalletaddress);
    const wallet = new ethers.Wallet(privateKey, provider1);
    
    let tx = {
        to: receiverwalletaddress,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(amount)
    }

    // Send a transaction
    try {
        const txObj = await wallet.sendTransaction(tx)
        return txObj;

    } catch (error) {
        console.log('Transaction Failed')
    }

}

// const txActivity = async (walletAddress, privateKey, provider) => {
//     if (provider == 'ethereum') {
//         let provider1 = ethers.getDefaultProvider("goerli");
//     }
//     else{
//         const provider1 = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
//     }
//     const ADDRESS = "0x31E3239f5305A26672A5923cd2439e1C936A4921";
//     const apikey = "ZYDTV4HXTU8KRZ9EIQA263HK287Y514ZN8";
//     const endpoint = "https://api-goerli.etherscan.io/api";

//     const etherscan = await axios.get(endpoint + `?module=account&action=txlist&address=${ADDRESS}&startblock=0
//     &endblock=99999999
//     &page=1
//     &offset=1000
//     &sort=asc
//     &apikey=${apikey}`);


//     const arr = etherscan.data;
//     let _res = JSON.parse(arr);
//     console.log(_res);


//     // if (arr.length == 0) {
//     //     return "No Transactions"
//     // }
//     // else {
//     //     //console.log(arr);
//     //     const result1 = arr[arr.length - 1]
//     //     setAmount1(ethers.utils.formatUnits(result1.value, "ether"));
//     //     setTo1(result1.to);
//     //     setFrom(result1.from);

//     //     // const result2 = arr[arr.length - 2];
//     //     // setAmount2(ethers.utils.formatUnits(result2.value, "ether"));
//     //     // setTo2(result2.to);
//     //     return result1;
//     // }
// }

const tokenTransfer = async (walletAddress, privateKey, receiverwalletaddress, amount, provider, tokenaddress) => {
    
    
    console.log(receiverwalletaddress);
    console.log(tokenaddress);
    console.log(provider);
    console.log(amount);

  
    const provider1 = new ethers.providers.JsonRpcProvider(provider);
    
    const wallet = new ethers.Wallet(privateKey, provider1);

    const ERCABI = [
        "function balanceOf(address) view returns (uint)",
        "function transfer(address to, uint amount) returns (bool)",
        "function symbol() external view returns (string memory)",
        "function name() external view returns (string memory)"
      ]
      
      // Contracts 
      const ERCContract = new ethers.Contract(tokenaddress, ERCABI, wallet);
      console.log(await ERCContract.name());

      const tx = await ERCContract.transfer(receiverwalletaddress, ethers.utils.parseEther(amount), {gasLimit:3000000});
      console.log(tx);
      return tx;

}

const tokenBalance = async(walletAddress, provider, tokenaddress) => {

    console.log(provider)
    const provider1 = new ethers.providers.JsonRpcProvider(provider);

    const ERCABI = [
        "function balanceOf(address) view returns (uint)",
        "function transfer(address to, uint amount) returns (bool)",
        "function symbol() external view returns (string memory)",
        "function name() external view returns (string memory)"
      ]
      
      // Contracts 
      const ERCContract = new ethers.Contract(tokenaddress, ERCABI, provider1);
      
      let balance = await ERCContract.balanceOf(walletAddress);
      balance = ethers.utils.formatUnits(balance, 18).toString();
      console.log(balance);

      return balance;

}

module.exports = { balance, send, tokenTransfer, tokenBalance }