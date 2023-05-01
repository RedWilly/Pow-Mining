import { InjectedConnector } from "@web3-react/injected-connector";

import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [10001],
});

// export const WalletConnect = new WalletConnectConnector({
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
//   rpc: { 568: "https://rpc-testnet.dogechain.dog" },
// });

export const WalletConnect = new WalletConnectConnector({
  rpc: {
    10001: "https://mainnet.ethereumpow.org",
  },
});
