import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

export interface MintingCloseProps {
  onClick: () => void;
  loading: boolean;
}

const MintingClose: React.FC<MintingCloseProps> = (props) => {
  return (
    <Box>
      <Typography
        sx={{ mb: '16px' }}
        align="left"
        textAlign="left"
        fontFamily='"Mont webfont",sans-serif;'
        fontSize="42px"
        color="primary.dark"
      >
        {'Thank you for your request!'}
      </Typography>
      <Typography
        align="left"
        textAlign="left"
        fontFamily="GlacialIndifference-Regular"
        fontSize="21px"
        color="primary.main"
      >
        {
          'We look forward to delivering your sneaker! In the meantime, please join '
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
        {' and say hello to the community.'}
      </Typography>
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <LoadingButton
          sx={{
            width: '200px',
            my: 5,
          }}
          loading={props.loading}
          loadingIndicator="Loading..."
          color="secondary"
          variant="contained"
          onClick={props.onClick}
        >
          Close
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default MintingClose;
