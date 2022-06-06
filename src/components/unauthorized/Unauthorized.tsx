import React from 'react'
import { useMetaMaskAccount } from '../../providers/MetaMaskProvider';

export const Unauthorized = () => {
  const { connectAccount } = useMetaMaskAccount();

  return (
    <div>
      <h1>Please connect your wallet</h1>
      <hr />
      <button onClick={connectAccount}>Connect MetaMask</button>
    </div>
  )
}
