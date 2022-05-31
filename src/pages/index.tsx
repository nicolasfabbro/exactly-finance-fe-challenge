import { useMetaMaskAccount } from '../providers/MetaMaskProvider';
import { ProtectedPageLayout } from '../components/layouts/ProtectedPageLayout';
import type { NextPage } from 'next';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const { isConnected, connectedAccount } = useMetaMaskAccount();

  return (
    <ProtectedPageLayout canAccess={isConnected}>
      <h1>Exactly finance</h1>
      ------------------------
      <p>Connected account: {connectedAccount}</p>
    </ProtectedPageLayout>
  )
}

export default Home;
