import React from 'react';
import Box from '@mui/material/Box';
import Header from 'src/components/organisms/Header';
import SubHeader from 'src/components/organisms/SubHeader';
import NFTList from 'src/components/organisms/NFTList';
import Collections from 'src/components/organisms/Collections';
import CollectionDetails from 'src/components/organisms/CollectionDetails';
import Description from 'src/components/atoms/Description';
import { Page, selectPage } from 'src/redux/reducers/page/page.slice';
import { useAppSelector } from 'src/redux/hooks';

const HomePage: React.FC = () => {
  const page = useAppSelector(selectPage);
  return (
    <>
      <Header />
      <Box
        sx={{
          px: '20px',
          fontFamily: 'GlacialIndifference-Regular',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <SubHeader />
        <Box
          sx={{
            maxWidth: '980px',
          }}
        >
          {page.page === Page.COLLECTIONS && <Collections />}
          {page.page === Page.ATLIER && <Description />}
          {page.page === Page.ATLIER && <NFTList />}
          {page.page.startsWith('details') && <CollectionDetails />}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
