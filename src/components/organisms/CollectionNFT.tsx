import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import DetailsButton from '../molecules/DetailsButton';
import { Nft } from 'src/utils/alchemy';
import { createImageURL } from 'src/utils/bucket';
import { useDispatch } from 'react-redux';
import { move } from 'src/redux/reducers/page/page.slice';
import { useNft } from 'src/contexts/NftContext';

const CollectionNFT: React.FC<Nft> = (nft) => {
  const dispatch = useDispatch();
  const { collections } = useNft();

  const {
    metadata,
    media,
    id: { tokenId, tokenMetadata },
    contract: { address },
  } = nft;
  if (!metadata || !metadata.name || !media || !tokenMetadata) {
    return null;
  }
  const index = collections?.findIndex(
    (e) => e.contract.address === address && e.id.tokenId === tokenId,
  );
  const image = createImageURL(nft.contract.address, `${Number(tokenId)}`);
  // const image = media[0].gateway || media[0].raw || metadata.image;
  // if (!image) {
  //   return null;
  // }

  return (
    <Card
      sx={{
        maxWidth: 285,
        padding: '0 0 16px 0',
        margin: 2,
        borderRadius: 0,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        console.log('details');
        if (index !== undefined) {
          dispatch(move(`details:${index}`));
        }
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <CardMedia
          sx={{
            height: 285,
            '&:hover': {
              transform: 'scale(1.2,1.2)',
              transition: '1s all',
            },
          }}
          component="img"
          image={image}
          alt={metadata.name}
        />
      </div>
      <CardContent
        sx={{
          justifyItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          textAlign="center"
          fontFamily="GlacialIndifference-Regular"
          fontSize="24"
        >
          {metadata.name}
        </Typography>
      </CardContent>
      {/* <CardActions
        sx={{
          justifyItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <DetailsButton
          nftName={metadata.name}
          contract={address}
          tokenId={tokenId.toString()}
          requested={true}
        />
      </CardActions> */}
    </Card>
  );
};

export default CollectionNFT;
