import { useState } from 'react';
import { useMetaMaskAccount } from '../providers/MetaMaskProvider';
import { ProtectedPageLayout } from '../components/layouts/ProtectedPageLayout';
import type { NextPage } from 'next';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const { isConnected, connectedAccount, accountBalance } = useMetaMaskAccount();

  return (
    <ProtectedPageLayout canAccess={isConnected}>
      <h1>Exactly finance</h1>
      ------------------------
      <h3>Connected account: {connectedAccount}</h3>
      <h6>Balance: ETH {accountBalance?.eth}</h6>
      <h6>Balance: cDAI {accountBalance?.cdai}</h6>
      <h6>Balance: DAI {accountBalance?.dai}</h6>
    </ProtectedPageLayout>
  )
}

export default Home;
