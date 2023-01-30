import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MyStudioLogo from '../atoms/MyStudioLogo';
import WalletButton from '../atoms/WalletButton';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSize } from 'src/utils/size';
import { styled } from '@mui/material/styles';
import MobileMenu from './MobileMenu';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Header: React.FC = () => {
  const { isMobileSize } = useSize();
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!isMobileSize && expanded) {
      setExpanded(false);
    }
  }, [expanded, isMobileSize]);

  return (
    <AppBar
      position="sticky"
      sx={{
        // px: 3,
        px: '20px',
        py: 0,
      }}
      elevation={0}
    >
      <Box
        sx={{
          my: 3,
          // marginX: 'calc(50vw - 490px)',
          px: 'calc(50vw - 510px)',
          display: 'flex',
          // margin: 'auto',
          // maxWidth: '980px',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: isMobileSize ? '40px' : '130px' }} />
        {isMobileSize ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <MyStudioLogo width="170px" height="40px" />
          </Box>
        ) : (
          <MyStudioLogo width="170px" height="40px" />
        )}
        {!isMobileSize && <WalletButton />}
        {isMobileSize && (
          <ExpandMore
            expand={expanded}
            onClick={() => {
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
          >
            {expanded ? <CloseIcon /> : <MenuIcon />}
          </ExpandMore>
        )}
      </Box>
      <Divider
        sx={{
          // my: 1.5,
          color: '#000000',
        }}
      />
      {/* {isMobileSize && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <MyStudioLogo width="170px" height="40px" />
        </Box>
      )} */}
      {/* {isMobileSize && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <WalletButton />
        </Collapse>
      )} */}
      {isMobileSize && <MobileMenu open={expanded} setOpen={setExpanded} />}
      {/* モバイル端末で開いた際、最初に読み込ませるため */}
      {isMobileSize && !expanded && (
        <Box
          sx={{
            display: 'none',
          }}
        >
          <WalletButton />
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
