require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.NODE_API_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY]
    },
  },
};
