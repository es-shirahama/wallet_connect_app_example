import React from 'react';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from 'src/redux/hooks';
import { selectAuth } from 'src/redux/reducers/auth/auth.slice';
import { API_ENDPOINT } from 'src/utils/env';
import Popup from '../atoms/Popup';
import Disclaimer from '../atoms/Disclaimer';
import MintingClose from '../atoms/MintingClose';
import MintingError from '../atoms/MintingError';

export type RequestButtonProps = {
  nftName: string;
  contract: string;
  tokenId: string;
  requested: boolean;
};

const RequestButton: React.FC<RequestButtonProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [minted, setMinted] = React.useState(false);
  const [error, setError] = React.useState(false);

  const auth = useAppSelector(selectAuth);
  const requestAgree = () => {
    setPopupOpen(true);
  };
  const handleMint = () => {
    if (auth.jwt) {
      const devMode = false;
      setLoading(true);
      if (devMode) {
        setLoading(false);
        setMinted(true);
      } else {
        axios
          .post(
            props.contract === 'mch'
              ? `${API_ENDPOINT}/minting/request/mch`
              : `${API_ENDPOINT}/minting/request`,
            {
              network: 'Ethereum',
              contract: props.contract,
              token_id: props.tokenId,
            },
            {
              headers: {
                Authorization: `Bearer ${auth.jwt}`,
              },
            },
          )
          .then(() => {
            setMinted(true);
          })
          .catch(() => {
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <React.Fragment>
      <LoadingButton
        sx={{
          width: '131',
        }}
        disabled={loading || !auth.jwt || minted || error || props.requested}
        loading={loading}
        loadingIndicator="Loading..."
        color="secondary"
        variant="contained"
        onClick={requestAgree}
      >
        {'Request'}
      </LoadingButton>
      <Popup
        open={popupOpen}
        handleOpen={() => setPopupOpen(true)}
        handleClose={() => setPopupOpen(false)}
      >
        {error ? (
          <MintingError onClick={() => setPopupOpen(false)} loading={false} />
        ) : !minted ? (
          <Disclaimer
            nftName={props.nftName}
            onCancel={() => setPopupOpen(false)}
            onClick={handleMint}
            loading={loading}
          />
        ) : (
          <MintingClose onClick={() => setPopupOpen(false)} loading={false} />
        )}
      </Popup>
    </React.Fragment>
  );
};

export default RequestButton;
