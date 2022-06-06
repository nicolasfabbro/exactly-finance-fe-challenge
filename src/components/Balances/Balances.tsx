import React from 'react'
import { useMetaMaskAccount } from '../../providers/MetaMaskProvider';

export const Balances = () => {
  const { accountBalance } = useMetaMaskAccount();

  return (
    <div>
      <strong>cDAI Balance</strong> {accountBalance?.cdai} <br />
      <strong>DAI Balance</strong> {accountBalance?.dai}
    </div>
  )
}
