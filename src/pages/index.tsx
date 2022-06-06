import { useState } from 'react';
import { useMetaMaskAccount } from '../providers/MetaMaskProvider';
import { ProtectedPageLayout } from '../components/layouts/ProtectedPageLayout';
import { ConnectedAccount } from '../components/ConnectedAccount';
import { Balances } from '../components/Balances';
import type { NextPage } from 'next';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const { isConnected } = useMetaMaskAccount();
  const [qty, setQty] = useState('0');

  const handleClick = () => {
    alert(`trying to convert ${qty} DAI to cDAI`);
    setQty('0');
  }

  return (
    <ProtectedPageLayout canAccess={isConnected}>
      <h1>Exactly finance</h1>
      ------------------------
      <ConnectedAccount />
      <Balances />
      ------------------------
      <div>
        <input type="text" value={qty} onChange={(e) => setQty(e.target.value)} />
        <button onClick={handleClick}>Convert to cDAI</button>
      </div>
    </ProtectedPageLayout>
  )
}

export default Home;
