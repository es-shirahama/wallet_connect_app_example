import { useMediaQuery } from '@mui/material';

export const useSize = () => {
  const isMobileSize: boolean = useMediaQuery('(max-width:577px)');
  return { isMobileSize };
};
