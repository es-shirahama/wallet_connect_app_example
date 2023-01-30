import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

export interface MintingCloseProps {
  onClick: () => void;
  loading: boolean;
}

const MintingError: React.FC<MintingCloseProps> = (props) => {
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
        {'Oops! Some thing went wrong.'}
      </Typography>
      <Typography
        align="left"
        textAlign="left"
        fontFamily="GlacialIndifference-Regular"
        fontSize="21px"
        color="primary.main"
      >
        {'Please reload the page and try again.'}
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

export default MintingError;
