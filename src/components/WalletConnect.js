import React, { useEffect } from "react";
// @styled-component
import { Layout } from "./WalletConnect.styled";

// @web3-react
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { injected, WalletConnect } from "../utils/Connectors";

//------------------------------------------------------------------

export const WalletConnectt = () => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const connectInjected = () => {
    if (window.ethereum) {
      activate(injected);
    } else {
      activate(WalletConnect);
    }
  };

  useEffect(() => {

    connectInjected();

    (async () => {
      if (account && window.ethereum) {
        if (chainId !== 568) {
          console.log(chainId, 568);
          console.log(account);
          try {
            await library.provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x" + (568).toString(16) }],
            });
          } catch (switchError) {
            console.log("Switch Error", switchError);
            /*
            try {
              await library.provider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x" + (2000).toString(16),
                    chainName: "DogeChain",
                    rpcUrls: ["https://rpc.dogechain.dog"],
                    nativeCurrency: {
                      name: "DogeChain",
                      symbol: "wDOGE",
                      decimals: 18,
                    },
                  },
                ],
              });
            } catch (addError) {
              console.log("Add Error", addError);
            }

             */
          }
        }
      }
    })();
  }, [chainId, account]);

  return (
    <Layout
      data-aos="zoom-in"
      onClick={() => {
        if (account) {
          deactivate();
        } else {
          connectInjected();
        }
      }}
    >
      {account
        ? account.substr(0, 5) + "..." + account.slice(-3)
        : "Connect Wallet"}
    </Layout>
  );
};
