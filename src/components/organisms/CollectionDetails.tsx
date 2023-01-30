import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNft } from 'src/contexts/NftContext';
import { useAppSelector } from 'src/redux/hooks';
import { selectPage } from 'src/redux/reducers/page/page.slice';
import { createImageURL, createUsdzURL } from 'src/utils/bucket';
import { Nft } from 'src/utils/alchemy';
import dw from 'src/assets/dw.png';
import red from 'src/assets/red.png';
import fbj from 'src/assets/fbj.jpeg';
import genso from 'src/assets/genso.png';
import { Button } from '@mui/material';
import { useSize } from 'src/utils/size';

const info = (nft: Nft) => {
  switch (nft.contract.address.toLowerCase()) {
    case '0x672ee4aB48A6823559e4600B22CCDEef1c031ca5'.toLowerCase(): {
      return {
        logo: fbj,
        bland: 'Freedom by Joyfa',
      };
    }
    case '0x43cc1ae5d86fd05c39c8fe0b5d5b358a658c5b8c'.toLowerCase(): {
      const tokenId = Number(nft.id.tokenId);
      let logo: string, bland: string;
      if (tokenId <= 6) {
        return null;
      } else if (tokenId <= 46) {
        logo = dw;
        bland = 'Diamond Walk';
      } else if (tokenId <= 126) {
        logo = red;
        bland = 'Red DAO';
      } else {
        return null;
      }
      return { logo, bland };
    }
    case '0x1a3C2B149177cdF622d4bB100E23dE427f565e70'.toLowerCase(): {
      const tokenId = Number(nft.id.tokenId);
      let logo: string, bland: string;
      if (tokenId <= 6) {
        return null;
      } else if (tokenId <= 26) {
        logo = dw;
        bland = 'Diamond Walk';
      } else if (tokenId <= 56) {
        logo = genso;
        bland = 'Genso';
      } else {
        return null;
      }
      return { logo, bland };
    }
    default: {
      return null;
    }
  }
};

const CollectionDetails: React.FC = () => {
  const page = useAppSelector(selectPage);
  const { isMobileSize } = useSize();
  const { collections } = useNft();
  const index = Number(page.page.split(':')[1]);
  const nft = collections && collections[index];
  if (!nft) return null;
  const address = nft.contract.address;
  const tokenId = `${Number(nft.id.tokenId)}`;
  const imangeURL = createImageURL(address, tokenId);
  const usdzURL = createUsdzURL(address, tokenId);
  return (
    nft && (
      <Box component={'div'}>
        <Grid
          container
          sx={{ margin: '30px 0px', p: 0 }}
          columns={{ xs: 6, sm: 12, md: 12 }}
        >
          <Grid
            sx={isMobileSize ? {} : { margin: '30px 0px', padding: 3 }}
            item
            xs={6}
            sm={6}
            md={6}
          >
            <img alt={''} src={imangeURL} width={'100%'} height={'auto'} />
          </Grid>
          <Grid
            sx={isMobileSize ? {} : { margin: '30px 0px', padding: 3 }}
            item
            xs={6}
            sm={6}
            md={6}
          >
            <Typography
              sx={{
                marginBottom: '10px',
              }}
              fontFamily="GlacialIndifference-Bold"
              fontSize="1.5rem"
            >
              {nft.metadata?.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                style={{
                  padding: '0 0 0 0',
                  marginRight: '10px',
                }}
                alt={info(nft)?.bland}
                src={info(nft)?.logo}
                width={'50px'}
                height={'50px'}
              />
              <Typography fontFamily="GlacialIndifference-Bold" fontSize="1rem">
                {info(nft)?.bland}
              </Typography>
            </Box>
            <Typography
              sx={{
                margin: '15px 0 30px 0',
              }}
              fontFamily="GlacialIndifference-Regular"
              fontSize="1rem"
              overflow="auto"
            >
              {nft.metadata?.description}
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              // disabled={!ios}
              onClick={() => {
                window.open(usdzURL);
              }}
            >
              <Typography
                sx={{
                  padding: '0.75rem 1.25rem',
                  fontSize: '1.3rem',
                }}
                fontFamily="GlacialIndifference-Bold"
                fontSize="1.2em"
              >
                View In AR
              </Typography>
            </Button>
            <Typography
              fontFamily="GlacialIndifference-Regular"
              fontSize="1rem"
              sx={{
                mt: '20px',
              }}
            >
              {'This AR functionality is supporting only mobile Safari.'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default CollectionDetails;
