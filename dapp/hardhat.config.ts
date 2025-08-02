require('dotenv').config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    monad_testnet: {
      url: 'https://testnet-rpc.monad.xyz/',
      accounts: [`0x${process.env.PRIVATE_KEY}`] // 你的私钥，建议使用环境变量来存储
    }
  },
};

export default config;
