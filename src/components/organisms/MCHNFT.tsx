import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Skeleton from '@mui/material/Skeleton';
import MintButton from '../molecules/MintButton';
import { MchNftWithRequestedParam } from 'src/contexts/NftContext';
import axios from 'axios';

export const NFTImage: React.FC<MchNftWithRequestedParam> = (nft) => {
  const { name, image_url } = nft;
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
    axios
      .get<string>(image_url)
      .then((res) => {
        setImageUrl(createImageUrl(res.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [image_url, imageUrl]);

  return !!imageUrl ? (
    <CardMedia
      sx={{ height: 285 }}
      component="img"
      image={imageUrl}
      alt={name}
    />
  ) : (
    <Skeleton sx={{ height: 285 }} variant="rectangular" />
  );
};

const NFT: React.FC<MchNftWithRequestedParam> = (nft) => {
  const { name, image_url, id: tokenId } = nft;

  return (
    <Card
      sx={{
        maxWidth: 285,
        padding: 2,
        margin: 2,
        borderRadius: 0,
      }}
    >
      <CardMedia
        sx={{ height: 285 }}
        component="img"
        image={image_url}
        alt={name}
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
          {name}
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
          nftName={name}
          contract={'mch'}
          tokenId={tokenId.toString()}
          requested={nft.requested}
        />
      </CardActions>
    </Card>
  );
};

export default NFT;
