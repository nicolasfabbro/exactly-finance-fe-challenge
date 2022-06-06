import React from 'react';
import { useMetaMaskAccount } from '../../providers/MetaMaskProvider';

export const ConnectedAccount = () => {
  const { connectedAccount } = useMetaMaskAccount();

  return (
    <div>
      <strong>Connected account</strong>: {connectedAccount}
    </div>
  )
}
