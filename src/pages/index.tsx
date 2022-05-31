import { ProtectedPageLayout } from '../components/layouts/ProtectedPageLayout';
import type { NextPage } from 'next';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <ProtectedPageLayout canAccess>
      <h1>Exactly finance</h1>
    </ProtectedPageLayout>
  )
}

export default Home;