import Web3 from 'web3';
import { abi, address } from './constant'; 

let web3;
let contractInstance;

if (window.ethereum) {
    web3 = new Web3(window.ethereum); // Menggunakan MetaMask sebagai provider
    contractInstance = new web3.eth.Contract(abi, address);
} else {
    console.error("MetaMask is not installed. Please install it to use this app.");
}

export { web3, contractInstance };
