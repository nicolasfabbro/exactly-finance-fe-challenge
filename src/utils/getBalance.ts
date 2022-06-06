import { ethers } from 'ethers';
import cDAIAbi from './abis/cdai.json';
import DAIAbi from './abis/cdai.json';

// @todo: type abi
const ABIMap: Record<string, any> = {
  cdai: {
    address: '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD',
    abi: cDAIAbi,
  },
  dai: {
    address: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
    abi: DAIAbi,
  },
};

// @todo: type eth
export const getBalance = async (ethereum: any, token: string, connectedAccount: string) => {
  if (!ABIMap[token]) {
    throw new Error('Invalid token');
  }

  const { address, abi } = ABIMap[token];

  const provider = new ethers.providers.Web3Provider(ethereum, "any");
  const contract = new ethers.Contract(address, abi, provider);
  const balance = await contract.balanceOf(connectedAccount);
  const decimals = await contract.decimals();
  const formattedBalance = ethers.utils.formatUnits(balance, decimals);

  return formattedBalance;
};