import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { store } from './redux/store';
import App from './App';
import { WalletConnectProvider } from './contexts/WalletConnectContext';
import { NftProvider } from './contexts/NftContext';
import reportWebVitals from './utils/reportWebVitals';
import './index.css';
import { WagmiConfig } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { ethereumClient, projectId } from 'src/utils/configure';
import { wagmiClient } from './utils/configure';
import { theme } from './styles/theme';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <WagmiConfig client={wagmiClient}>
          <WalletConnectProvider>
            <NftProvider>
              <App />
              <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
              />
            </NftProvider>
          </WalletConnectProvider>
        </WagmiConfig>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
