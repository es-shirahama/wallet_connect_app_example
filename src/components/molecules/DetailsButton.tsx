import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { move } from 'src/redux/reducers/page/page.slice';
import { useNft } from 'src/contexts/NftContext';

export type DetailsButtonProps = {
  nftName: string;
  contract: string;
  tokenId: string;
  requested: boolean;
};

const DetailsButton: React.FC<DetailsButtonProps> = (props) => {
  const dispatch = useDispatch();
  const { collections } = useNft();
  const index = collections?.findIndex(
    (e) =>
      e.contract.address === props.contract && e.id.tokenId === props.tokenId,
  );
  return (
    <React.Fragment>
      <LoadingButton
        sx={{
          width: '131',
        }}
        color="secondary"
        variant="contained"
        onClick={() => {
          console.log('details');
          if (index !== undefined) {
            dispatch(move(`details:${index}`));
          }
        }}
      >
        {'View More'}
      </LoadingButton>
    </React.Fragment>
  );
};

export default DetailsButton;
