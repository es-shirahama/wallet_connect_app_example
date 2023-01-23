import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { configureChains, createClient } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

const chains = [mainnet, polygon];

// Wagmi client
// name: joyfa-my-studio
export const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: 'fbaaab50245cf50bb9b707a9fb3a25aa' }),
  // walletConnectProvider({ projectId: '8e6b5ffdcbc9794bf9f4a1952578365b' }),
]);
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: 'Joyfa MyStudio',
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
