import React from 'react';
import Button from '@mui/material/Button';
import { useWalletConnect } from 'src/contexts/WalletConnectContext';
import { Typography } from '@mui/material';

export type WalletButtonProps = {
  menu?: boolean;
};

const WalletButton: React.FC<WalletButtonProps> = (props) => {
  const { address, onOpenModal } = useWalletConnect();
  const { menu } = props;
  return (
    <Button
      variant="contained"
      size="small"
      color="secondary"
      sx={{
        height: '40px',
        width: menu ? '250px' : 'auto',
        px: menu ? '0px' : '10px',
        borderRadius: 0,
      }}
      onClick={onOpenModal}
    >
      <Typography fontFamily="GlacialIndifference-Bold" fontSize="1.2em">
        {address
          ? `${address.slice(0, 8)}...${address.slice(address.length - 6)}`
          : 'Connect Wallet'}
      </Typography>
    </Button>
  );
};

export default WalletButton;
