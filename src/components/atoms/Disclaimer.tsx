import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useSize } from 'src/utils/size';

export interface DisclaimerProps {
  nftName: string;
  onClick: () => void;
  onCancel: () => void;
  loading: boolean;
}

const Disclaimer: React.FC<DisclaimerProps> = (props) => {
  const { isMobileSize } = useSize();
  return (
    <>
      <Typography
        align="left"
        fontSize={isMobileSize ? '32px' : '42px'}
        // fontFamily='GlacialIndifference-Bold'
        fontFamily='"Mont webfont",sans-serif;'
        color="primary.dark"
      >
        Things to Know
      </Typography>
      <List sx={{ listStyleType: 'disc' }}>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography
            // component={'div'}
            // sx={{ display: 'list-item' }}
            align="left"
            fontSize={isMobileSize ? '18px' : '21px'}
            fontFamily="GlacialIndifference-Regular"
            color="primary"
          >
            Your digital sneaker NFT will be delivered to your Polygon address
            in 2 - 3 days.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography
            align="left"
            fontSize={isMobileSize ? '18px' : '21px'}
            fontFamily="GlacialIndifference-Regular"
            color="primary"
          >
            We support NFTs with the issuance right belonging to the NFT owner.
            If you notice others, please contact info@joyfa.io.
          </Typography>
        </ListItem>
      </List>
      <Box
        sx={{
          my: 5,
          mx: 2,
          textAlign: 'right',
          // width: '100%',
          flexDirection: 'row-reverse',
        }}
      >
        <LoadingButton
          sx={{
            width: '200px',
            // mx: 2,
            margin: '10px 16px',
            borderRadius: 0,
          }}
          loading={props.loading}
          loadingIndicator="Loading..."
          color="primary"
          variant="outlined"
          onClick={props.onCancel}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          sx={{
            width: '200px',
            // width: 347,
            // height: 64,
            // mx: 2,
            margin: '10px 16px',
          }}
          loading={props.loading}
          loadingIndicator="Loading..."
          color="secondary"
          variant="contained"
          onClick={props.onClick}
        >
          Proceed
        </LoadingButton>
      </Box>
    </>
  );
};

export default Disclaimer;
