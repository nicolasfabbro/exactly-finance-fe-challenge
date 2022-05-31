import React from 'react'
import { useMetaMaskAccount } from '../../providers/MetaMaskProvider';

export const Unauthorized = () => {
  const { ethereum, connectAccount } = useMetaMaskAccount();

  if (!ethereum) {
    return <h1>Please install MetaMask to connect to this site</h1>
  }

  return (
    <div>
      <h1>Please connect your wallet</h1>
      <hr />
      <button onClick={connectAccount}>Connect MetaMask</button>
    </div>
  )
}
