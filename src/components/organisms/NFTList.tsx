import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NFT from './NFT';
import { useNft } from 'src/contexts/NftContext';

const NFTList: React.FC = () => {
  const { nfts, mchNfts } = useNft();

  return (
    nfts &&
    mchNfts &&
    (nfts.length === 0 && mchNfts.length === 0 ? (
      <Box
        sx={{
          my: '70px',
        }}
      >
        <Typography
          align="left"
          textAlign="left"
          fontFamily="GlacialIndifference-Regular"
          fontSize="21px"
          color="primary.main"
        >
          {
            'You do not have any NFTs Freedom is currently supporting. Please join '
          }
          <Typography
            component="a"
            href="https://discord.com/invite/9tPnKZtA89"
            target="_blank"
            fontFamily="GlacialIndifference-Regular"
            fontSize="1.3rem"
            color="secondary"
          >
            {'our Discord'}
          </Typography>
          {' to stay informed as we announce new projects.'}
        </Typography>
      </Box>
    ) : (
      <Stack spacing={1} alignItems="center">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {nfts.map((nft) => (
            <NFT key={`${nft.contract.address}-${nft.id.tokenId}`} {...nft} />
          ))}
        </Box>
      </Stack>
    ))
  );
};

export default NFTList;
