import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Page, selectPage, move } from 'src/redux/reducers/page/page.slice';
import { useAppSelector } from 'src/redux/hooks';
import { useDispatch } from 'react-redux';
import { useSize } from 'src/utils/size';

const SubHeader: React.FC = () => {
  const { isMobileSize } = useSize();
  const page = useAppSelector(selectPage);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: isMobileSize ? 'none' : undefined,
        maxWidth: '980px',
        width: '100vw',
      }}
    >
      <Box sx={{ mt: '1rem' }}>
        <Grid container spacing={0} alignItems="center">
          <Grid
            item
            xs={4}
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography
              component="div"
              textAlign="left"
              align="left"
              color="secondary"
            >
              <Typography
                component="span"
                fontFamily="GlacialIndifference-Regular"
                textAlign="left"
                align="left"
                color="secondary"
                sx={{
                  cursor: 'pointer',
                  textDecoration:
                    page.page === Page.COLLECTIONS ||
                    page.page.startsWith('details')
                      ? 'underline'
                      : 'none',
                }}
                onClick={() => {
                  dispatch(move(Page.COLLECTIONS));
                }}
              >
                Collections
              </Typography>
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              flexDirection: 'row',
            }}
          >
            <Typography
              component="div"
              textAlign="center"
              align="center"
              color="secondary"
            >
              <Typography
                component="span"
                fontFamily="GlacialIndifference-Regular"
                textAlign="center"
                align="center"
                color="secondary"
                sx={{
                  cursor: 'pointer',
                  textDecoration:
                    page.page === Page.ATLIER ? 'underline' : 'none',
                }}
                onClick={() => {
                  dispatch(move(Page.ATLIER));
                }}
              >
                Atelier
              </Typography>
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              flexDirection: 'row-reverse',
            }}
          >
            <Typography
              component="div"
              textAlign="right"
              align="right"
              color="secondary"
            >
              <Typography
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                component="span"
                // href="https://www.joyfa.io/"
                fontFamily="GlacialIndifference-Regular"
                textAlign="right"
                align="right"
                color="primary"
                onClick={() => {
                  window.open('https://www.joyfa.io/');
                }}
              >
                Leave
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SubHeader;
