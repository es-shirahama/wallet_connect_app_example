import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
} from 'react';
import SignClient from '@walletconnect/sign-client';
import { Web3Modal } from '@web3modal/standalone';
import { useAccount, useSignMessage } from 'wagmi';
import { projectId } from 'src/utils/configure';

export type WalletConnectContextValue = {
  address: string | undefined;
  // signAvailable: boolean;
  signMessage: (message: string) => Promise<string | null>;
  signClient: SignClient | undefined;
  onOpenModal: () => Promise<void>;
};
export const WalletConnectContext = createContext(
  {} as WalletConnectContextValue,
);
export const useWalletConnect = () => useContext(WalletConnectContext);
export type WalletConnectProviderProps = React.PropsWithChildren;

const web3Modal = new Web3Modal({ projectId });

export const WalletConnectProvider: React.FC<WalletConnectProviderProps> = (
  props,
) => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [signClient, setSignClient] = useState<SignClient | undefined>(
    undefined,
  );
  // const [signAvailable, setSignAvailable] = useState<boolean>(false);

  const signMessage = async (message: string) => {
    const signature = await signMessageAsync({ message });
    return signature;
    // if (!signAvailable) {
    //   throw new Error('sign unavailable');
    // }
    // try {
    //   setSignAvailable(false);
    //   const signature = await signMessageAsync({ message });
    //   setSignAvailable(true);
    //   return signature;
    // } catch (error) {
    //   console.error(error);
    //   setSignAvailable(true);
    //   return null;
    // }
  };

  const onInitializeSignClient = useCallback(async () => {
    const client = await SignClient.init({ projectId });
    setSignClient(client);
  }, []);

  const onOpenModal = async () => {
    if (signClient) {
      const namespaces = {
        eip155: {
          methods: ['eth_sign'],
          chains: ['eip155:1'],
          events: ['accountsChanged'],
        },
      };
      const { uri, approval } = await signClient.connect({
        requiredNamespaces: namespaces,
      });
      if (uri) {
        await web3Modal.openModal({
          uri,
          standaloneChains: namespaces.eip155.chains,
        });
        await approval();
        web3Modal.closeModal();
      }
    }
  };

  useEffect(() => {
    void onInitializeSignClient();
  }, [onInitializeSignClient]);

  return (
    <WalletConnectContext.Provider
      value={{
        address,
        // signAvailable,
        signMessage,
        signClient,
        onOpenModal,
      }}
    >
      {props.children}
    </WalletConnectContext.Provider>
  );
};
