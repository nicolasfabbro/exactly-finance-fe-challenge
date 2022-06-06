import { FC, ReactNode } from 'react';
import { useMetaMaskAccount } from '../../providers/MetaMaskProvider';
import { Unauthorized } from '../unauthorized';

type Props = {
  canAccess: boolean;
  children?: ReactNode;
};

export const ProtectedPageLayout: FC<Props> = ({ canAccess, children }) => {
  const { ethereum } = useMetaMaskAccount();

  if (!ethereum) {
    return <h1>Please install MetaMask to connect to this site</h1>
  }

  if (!canAccess) return <Unauthorized />

  return (
    <>{children}</>
  )
}
