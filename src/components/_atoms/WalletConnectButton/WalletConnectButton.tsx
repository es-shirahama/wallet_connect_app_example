import React from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useWalletConnect } from 'src/contexts/WalletConnectContext';
import './WalletConnectButton.css';

const WalletConnectButton: React.FC = () => {
  const { signClient, onOpenModal } = useWalletConnect();
  const account = useAccount();
  const sign = useSignMessage();
  // console.log(account);
  // console.log(sign);
  const si = () => {
    void sign
      .signMessageAsync({ message: new Date().getTime().toString() })
      .then((value) => {
        console.log(value);
      });
  };
  // if (!!sign.signMessageAsync) {
  //   si();
  // }
  return signClient ? (
    account.address ? (
      <>
        <button id="wallet-connect-button" onClick={onOpenModal}>
          {account.address}
        </button>
        <button id="wallet-connect-button" onClick={si}>
          sign
        </button>
      </>
    ) : (
      <button id="wallet-connect-button" onClick={onOpenModal}>
        Connect Wallet
      </button>
    )
  ) : (
    <button id="wallet-connect-button" disabled>
      Loading...
    </button>
  );
  // return signClient ? (
  //   <Web3Button icon="show" label="Connect Wallet" />
  // ) : (
  //   <button id="wallet-connect-button" disabled>
  //     Loading...
  //   </button>
  // );
};

export default WalletConnectButton;
