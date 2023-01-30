import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import { NftWithRequestedParam } from 'src/contexts/NftContext';
import axios from 'axios';

const NFTImage: React.FC<NftWithRequestedParam> = (nft) => {
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
      const image = media[0].gateway;
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

export default NFTImage;
