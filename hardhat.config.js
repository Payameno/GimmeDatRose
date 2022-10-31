// require("@nomicfoundation/hardhat-toolbox");
//waffle package should be installed first >> npm install -D @nomiclabs/hardhat-waffle ethereum-waffle
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
//dotenv module will keep our environment secrets seperate from our actual code

//using dotenv module to load the required parameters
const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
