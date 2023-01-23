import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';
import { ethereumClient, wagmiClient } from '../../utils/configure';

const Web3: Component.WithChildren = (props) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        {props.children}
      </WagmiConfig>
      <Web3Modal ethereumClient={ethereumClient}/>
    </>
  );
};

export default Web3;
