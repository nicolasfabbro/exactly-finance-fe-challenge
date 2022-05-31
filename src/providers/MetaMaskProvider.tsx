import { useState, useEffect, createContext, useContext, FC, ReactNode } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from 'ethers';
import cDAITokenAbi from '../utils/cDAITokenAbi.json';

type MetaMaskContextTypes = {
  ethereum: any;
  isConnected: boolean;
  connectedAccount: string | undefined;
  connectAccount: () => void;
  accountBalance: {
    eth?: string;
    cdai?: any;
    dai?: any;
  };
};

const MetaMaskAccountContext = createContext<MetaMaskContextTypes>({
  ethereum: null,
  isConnected: false,
  connectedAccount: '',
  connectAccount: () => { },
  accountBalance: { },
});

type ProviderProps = {
  children: ReactNode;
};

const MetaMaskAccountProvider: FC<ProviderProps> = ({ children }) => {
  const cDAIAddress = '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD';
  const DAIAddress = '0x468409860F155Ec6A90ba64ecBa077eaA6C1f5A5';

  const [ethereum, setEthereum] = useState<any>(null);
  const [connectedAccount, setConnectedAccount] = useState<string | undefined>('');
  const [balance, setBalance] = useState<MetaMaskContextTypes['accountBalance']>({});

  const setEthereumFromWindow = async () => {
    if (window.ethereum) {
      // Reload if chain changes
      window.ethereum.on('chainChanged', () => window.location.reload());

      // Reload if account changes
      window.ethereum.on('accountsChanged', () => window.location.reload());

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const kovanId = '0x2a'; // See <https://docs.metamask.io/guide/ethereum-provider.html#chain-ids>
      if (chainId === kovanId) {
        setEthereum(window.ethereum);
      } else {
        alert('Please use Kovan network');
      }
    }
  }

  const handleAccounts = (accounts: string[]) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      // console.log('We have an authorized account: ', account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet")
    }
  };

  const getConnectedAccount = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      // console.log('getConnectedAccount - eth_accounts', accounts);

      if (accounts && Array.isArray(accounts)) {
        handleAccounts(accounts);
      }
    }
  };

  const connectAccount = async () => {
    if (!ethereum) {
      console.error('Ethereum object is required to connect an account');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log('eth_requestAccounts - connectAccount', accounts);
    if (accounts && Array.isArray(accounts)) {
      handleAccounts(accounts);
    }
  };

  const getAccountBalance = async () => {
    if (ethereum && connectedAccount) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");

      const cDAIContract = new ethers.Contract(cDAIAddress, cDAITokenAbi, provider);
      const cDAIBalance = await cDAIContract.balanceOf(connectedAccount);

      // const DAIContract = new ethers.Contract(DAIAddress, cDAITokenAbi, provider);
      // const DAIBalance = await DAIContract.balanceOf(connectedAccount);

      const ethBalance = await provider.getBalance(connectedAccount);

      return {
        eth: ethers.utils.formatEther(ethBalance),
        cdai: cDAIBalance.toString(),
        // dai: DAIBalance.toString(),
      }
    }
  };


  useEffect(() => {
    setEthereumFromWindow();
  }, []);

  useEffect(() => {
    getConnectedAccount();

    getAccountBalance().then(res => {
      setBalance(res || {});
    })
  }, [ethereum, connectedAccount]);

  const value = {
    ethereum,
    isConnected: Boolean(connectedAccount),
    connectedAccount,
    connectAccount,
    accountBalance: balance,
  };

  return (
    <MetaMaskAccountContext.Provider value={value}>
      {children}
    </MetaMaskAccountContext.Provider>
  )
}

export const useMetaMaskAccount = () => {
  return useContext(MetaMaskAccountContext);
}

export default MetaMaskAccountProvider;
