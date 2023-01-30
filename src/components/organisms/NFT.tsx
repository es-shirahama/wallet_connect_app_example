import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Skeleton from '@mui/material/Skeleton';
import MintButton from '../molecules/MintButton';
import { NftWithRequestedParam } from 'src/contexts/NftContext';
import axios from 'axios';

export const NFTImage: React.FC<NftWithRequestedParam> = (nft) => {
  const { media, metadata } = nft;
  const [imageUrl, setImageUrl] = React.useState('');
  const createImageUrl = (image: string) => {
    const blob = new Blob([Buffer.from(image, 'base64')], {
      type: 'image/png',
    });
    const urlCreator = window.URL || window.webkitURL;
    const src = urlCreator.createObjectURL(blob);
    return src;
  };
  React.useEffect(() => {
    if (media) {
      const image = media[0].thumbnail || media[0].gateway;
      if (image && !imageUrl) {
        axios
          .get<string>(image)
          .then((res) => {
            setImageUrl(createImageUrl(res.data));
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }, [imageUrl, media]);

  return !!imageUrl ? (
    <CardMedia
      sx={{ height: 285 }}
      component="img"
      image={imageUrl}
      alt={metadata && metadata.name}
    />
  ) : (
    <Skeleton sx={{ height: 285 }} variant="rectangular" />
  );
};

const NFT: React.FC<NftWithRequestedParam> = (nft) => {
  const {
    metadata,
    media,
    id: { tokenId, tokenMetadata },
    contract: { address },
  } = nft;
  // console.log(nft.tokenUri);
  // console.log(
  //   `data:application/json;base64,${Buffer.from(
  //     JSON.stringify(nft.metadata),
  //   ).toString('base64')}`,
  // );
  // console.log(Buffer.from(JSON.stringify(nft)).toString('base64').length);
  if (!metadata || !metadata.name || !media || !tokenMetadata) {
    return null;
  }

  let image =
    media[0].thumbnail || media[0].gateway || media[0].raw || metadata.image;
  // const image = media[0].gateway || metadata.image;
  if (!image) {
    return null;
  }
  // console.log(nft.tokenUri);
  // console.log(media[0].gateway);
  // console.log(metadata.image);
  // console.log(metadata.image);
  const svgIllegalPrefix =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.2"';
  const svgPrefix = 'data:image/svg+xml;utf8,';
  if (image.startsWith(svgIllegalPrefix)) {
    const data = image.split(svgPrefix)[1];
    const encoded = encodeURIComponent(data);
    image = `${svgPrefix}${encoded}`;
  }

  return (
    <Card
      sx={{
        maxWidth: 285,
        padding: 2,
        margin: 2,
        borderRadius: 0,
      }}
    >
      {/* <NFTImage {...nft} /> */}
      <CardMedia
        sx={{ height: 285 }}
        component="img"
        src={image
          .replace('http://', 'https://')
          .replace('ipfs.io', 'joyfa.mypinata.cloud')}
        alt={metadata.name}
      />
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
      <CardActions
        sx={{
          justifyItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <MintButton
          nftName={metadata.name}
          contract={address}
          tokenId={tokenId.toString()}
          requested={nft.requested}
        />
      </CardActions>
    </Card>
  );
};

export default NFT;
