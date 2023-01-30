import React, { useContext, createContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Nft, GetNftsResponse, MCHNFT } from 'src/utils/alchemy';
import { API_ENDPOINT } from 'src/utils/env';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import {
  selectAuth,
  signInAsync,
  refreshAsync,
  getLocalAddress,
} from 'src/redux/reducers/auth/auth.slice';
import { useWalletConnect } from './WalletConnectContext';

export interface NftContextValue {
  nfts: NftWithRequestedParam[] | null;
  mchNfts: MchNftWithRequestedParam[] | null;
  collections: Nft[] | null;
}

export type RequestedNftsRes = {
  address: string;
  token_id: string;
}[];

export type NftWithRequestedParam = Nft & {
  requested: boolean;
};
export type MchNftWithRequestedParam = MCHNFT & {
  requested: boolean;
};

export const NftContext = createContext({} as NftContextValue);

export const useNft = () => useContext(NftContext);

export type NftProviderProps = React.PropsWithChildren<{
  children?: React.ReactNode;
}>;

export const NftProvider: React.FC<NftProviderProps> = (props) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const wallet = useWalletConnect();
  const [nfts, setNfts] = React.useState<NftWithRequestedParam[] | null>(null);
  const [collections, setCollections] = React.useState<Nft[] | null>(null);
  const [mchNfts, setMchNfts] = React.useState<
    MchNftWithRequestedParam[] | null
  >(null);
  const [currentAccount, setCurrentAccount] = React.useState<
    string | undefined
  >(undefined);
  const [signModalOpen, setSignModalOpen] = React.useState(false);

  const refresh = React.useCallback(async () => {
    await dispatch(refreshAsync()).then((res) => {
      if ((res as any)['error']) {
        throw (res as any)['error'];
      }
    });
  }, [dispatch]);

  const signIn = React.useCallback(async () => {
    setSignModalOpen(false);
    if (!wallet.address) {
      throw new Error('wallet not connected');
    }
    // [TODO] `Sign in to My Studio.`
    const message = `Sign in to My Studio. (${new Date()
      .getTime()
      .toString()})`;
    console.log(message);
    const sig = await wallet.signMessage(message);
    if (sig) {
      await dispatch(
        signInAsync({
          address: wallet.address,
          sig: `${message}:${sig}`,
          // sig: `${message}:${sig.replace('0x', '')}`,
        }),
      );
    }
  }, [wallet, dispatch]);

  const getCollections = async (jwt: string) => {
    return await axios.get<GetNftsResponse>(
      `${API_ENDPOINT}/alchemy/nfts/collections`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
  };
  const getEthereumNfts = async (jwt: string) => {
    return await axios.get<GetNftsResponse>(
      `${API_ENDPOINT}/alchemy/nfts/ethereum`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
  };
  const getMchNfts = async (jwt: string) => {
    return await axios.get<MCHNFT[]>(`${API_ENDPOINT}/alchemy/nfts/mch`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  };

  const getRequestedNfts = async (jwt: string) => {
    return await axios.get<RequestedNftsRes>(
      `${API_ENDPOINT}/minting/requested`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
  };

  React.useEffect(() => {
    if (!auth.jwt) {
      if (nfts) {
        setNfts(null);
        setSignModalOpen(false);
      } else if (wallet.address) {
        if (!signModalOpen) {
          if (getLocalAddress() === wallet.address) {
            console.log('refresh');
            refresh().catch((err) => {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              console.log(`[refresh] ${err.message}`);
              console.log('signin');
              setSignModalOpen(true);
            });
          } else {
            console.log('signin');
            setSignModalOpen(true);
          }
        }
      }
    } else {
      if (wallet.address === currentAccount) {
        if (!nfts && currentAccount && auth.jwt) {
          setNfts([]);
          setCollections([]);
          void Promise.all([
            getEthereumNfts(auth.jwt),
            getMchNfts(auth.jwt),
            getRequestedNfts(auth.jwt),
            getCollections(auth.jwt),
          ])
            .then(
              ([
                ownedNftsRes,
                ownedMchNftsRes,
                requestedNftsRes,
                collections,
              ]) => ({
                ownedNfts: ownedNftsRes.data.ownedNfts
                  .map((nft) => {
                    console.log(nft);
                    return nft;
                  })
                  .filter((nft) => !nft.error)
                  .filter((nft) => !!nft.metadata?.image),
                ownedMchNfts: ownedMchNftsRes.data,
                requestedNfts: requestedNftsRes.data,
                collections: collections.data.ownedNfts,
              }),
            )
            .then(({ ownedNfts, ownedMchNfts, requestedNfts, collections }) => {
              const nfts: NftWithRequestedParam[] = ownedNfts.map((nft) => {
                const requestedNft = requestedNfts.find(
                  (e) =>
                    e.address === nft.contract.address &&
                    e.token_id === nft.id.tokenId,
                );
                return {
                  ...nft,
                  requested: !!requestedNft,
                };
              });
              const mchNfts: MchNftWithRequestedParam[] = ownedMchNfts.map(
                (nft) => {
                  const requestedNft = requestedNfts.find(
                    (e) =>
                      e.address === 'mch' && `${e.token_id}` === `${nft.id}`,
                  );
                  return {
                    ...nft,
                    requested: !!requestedNft,
                  };
                },
              );
              setNfts(nfts);
              setMchNfts(mchNfts);
              setCollections(collections);
            });
        }
      } else {
        setCurrentAccount(wallet.address);
        setSignModalOpen(false);
        setNfts(null);
      }
    }
  }, [
    auth.jwt,
    wallet,
    currentAccount,
    dispatch,
    nfts,
    refresh,
    signIn,
    signModalOpen,
  ]);

  return (
    <NftContext.Provider
      value={{
        nfts,
        mchNfts,
        collections,
      }}
    >
      <Modal
        open={signModalOpen}
        onClose={() => {
          console.log('');
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            border: '0',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Signature required
          </Typography>
          <Button
            fullWidth
            variant="contained"
            size="small"
            color="secondary"
            sx={{
              height: '40px',
              px: '10px',
              borderRadius: 0,
              // margin: '15px',
              marginTop: '20px',
            }}
            onClick={() => {
              void signIn();
            }}
          >
            <Typography fontFamily="GlacialIndifference-Bold" fontSize="1.2em">
              {'Sign in'}
            </Typography>
          </Button>
        </Box>
      </Modal>
      {props.children}
    </NftContext.Provider>
  );
};
