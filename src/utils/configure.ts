import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { configureChains, createClient } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { WALLET_CONNECT_PROJECT_ID } from 'src/utils/env';

export const projectId = WALLET_CONNECT_PROJECT_ID;

const chains = [mainnet, polygon];
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: 'Joyfa MyStudio',
    chains,
  }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);
