import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Description: React.FC = () => {
  return (
    <Box sx={{}}>
      <Box sx={{ mt: '3rem' }}>
        <Typography
          fontFamily="GlacialIndifference-Regular"
          fontSize="1.3rem"
          color="primary"
        >
          {
            'Please select your NFT to request your “Freedom” digital sneaker NFT.'
          }{' '}
          <Typography
            component="a"
            href="https://www.joyfa.io/freedom"
            target="_blank"
            fontFamily="GlacialIndifference-Regular"
            fontSize="1.3rem"
            color="secondary"
          >
            {'Learn More'}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Description;
