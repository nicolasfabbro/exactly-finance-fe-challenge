import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { getBalance } from '../utils/getBalance';

type MetaMaskContextTypes = {
  // @todo: type eth
  ethereum: any;
  isConnected: boolean;
  connectedAccount: string | undefined;
  connectAccount: () => void;
  accountBalance: {
    cdai?: string;
    dai?: string;
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
  children?: ReactNode;
};

const MetaMaskAccountProvider = ({ children }: ProviderProps) => {
  const [ethereum, setEthereum] = useState<any>(null);
  const [connectedAccount, setConnectedAccount] = useState<string | undefined>('');
  const [balance, setBalance] = useState<MetaMaskContextTypes['accountBalance']>({
    cdai: '0',
    dai: '0',
  });

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
        // @todo add error handling
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
      const cdaiBalance = await getBalance(ethereum, 'cdai', connectedAccount);
      const daiBalance = await getBalance(ethereum, 'dai', connectedAccount);

      return {
        cdai: cdaiBalance,
        dai: daiBalance,
      }
    }
  };


  useEffect(() => {
    setEthereumFromWindow();
  }, []);

  useEffect(() => {
    getConnectedAccount();

    // @todo: add error handling
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
