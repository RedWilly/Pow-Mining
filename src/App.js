import { useEffect, useState } from "react";
import { Card } from "./components/card";
import { UnstakeCard } from "./components/UnstakeCard";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { Contract } from "@ethersproject/contracts";
import { nftProxyCA, stakingProxyCA, tokenCA } from "./config";
import nftAbi from "./artifacts/contracts/Mutants.sol/Mutants.json";
import stakeAbi from "./artifacts/contracts/MutantStaking.sol/MutantStaking.json";
import tokenAbi from "./artifacts/contracts/SimpleToken.sol/SimpleToken.json";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import icon1 from "./assets/Vector1.png";
import icon2 from "./assets/Vector2.png";
import icon3 from "./assets/Vector3.png";
import icon4 from "./assets/Vector4.png";
import icon5 from "./assets/Vector5.png";

function App() {
  // Unstaked = 1 , Staked = 2
  const [menuState, setMenuState] = useState(1);
  const [walletConnected, setWalletConnected] = useState(false);
  const { account, active, error, library, networkId } = useWeb3React();
  const [wallet, setWallet] = useState([]);
  const [staked, setStaked] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalStakedPercentage, setTotalStakedPercentage] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [rate, setRate] = useState(0);
  const [balance, setBalance] = useState(0);

  const harvest = async () => {
    let stakeContract = new Contract(
      stakingProxyCA,
      stakeAbi.abi,
      library.getSigner()
    );
    await (await stakeContract.harvest()).wait();
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      if (account && window.ethereum) {
        setWalletConnected(true);
        let nftContract = new Contract(nftProxyCA, nftAbi.abi, library);
        nftContract.balanceOf(account).then((balance) => {
          for (var i = 0; i < balance; i++) {
            nftContract.tokenOfOwnerByIndex(account, i).then((tokenId) => {
              let newWallet = wallet;
              newWallet[tokenId] = tokenId.toString();
              setWallet(newWallet);
            });
          }
        });

        nftContract.balanceOf(stakingProxyCA).then((balance) => {
          setTotalStaked(balance.toString());
          setTotalStakedPercentage(
            Math.round((parseInt(balance.toString()) / 2100) * 10000) / 100
          );
        });

        let tokenContract = new Contract(tokenCA, tokenAbi.abi, library);
        tokenContract.balanceOf(account).then((balance) => {
          setBalance(
            parseFloat(ethers.utils.formatEther(balance.toString())).toFixed(4)
          );
        });

        let stakeContract = new Contract(stakingProxyCA, stakeAbi.abi, library);
        stakeContract.earnings(account).then((earned) => {
          setEarnings(
            parseFloat(ethers.utils.formatEther(earned.toString())).toFixed(4)
          );
        });
        stakeContract.released().then((released) => {
          setTotalPayout(
            parseFloat(ethers.utils.formatEther(released.toString())).toFixed(2)
          );
        });
        stakeContract.rate().then((rate) => {
          setRate(
            parseFloat(ethers.utils.formatEther(rate.toString())).toFixed(2)
          );
        });

        stakeContract.depositsOf(account).then((deposits) => {
          let staked = [];
          for (var i in deposits) {
            staked.push(deposits[i]);
          }
          setStaked(staked);
        });
      }
    })();
  });

  return (
    <div className="">
      <Header />
      <div className="min-h-screen bg-[#2a303c] px-3 py-2 md:px-32 md:py-6">
        <div className="flex-col justify-center items-center space-y-6">
          {/* 1 - Logo Bar */}
          <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] p-4 text-white">
            <p>LOGO</p>
            <p>Select Wallet</p>
          </div>

          {/* 2 -  Bar */}
          <div className="flex flex-col lg:flex-row justify-center items-center text-xs md:text-lg text-white lg:space-x-4 space-y-8 lg:space-y-0 ">
            {/* Left Side */}
            <div
              className="bg-[#1E2523] flex-col justify-center items-center rounded-[10px] w-[100%] h-[250px] space-y-5
            py-10 pl-10 pr-4 md:pl-14 "
            >
              <div className="flex justify-between items-center">
                {/* 1 */}
                <div className="flex-col justify-between items-center">
                  <h2 className="text-lg">
                    <div className="flex justify-center items-center space-x-3">
                      <span className="ml-[-27px]">
                        <img
                          className="w-[15px] h-[15px] bg-[#07FEA3] p-[1.5px]"
                          src={icon1}
                          alt=""
                        />
                      </span>{" "}
                      <span>Mutants Staked</span>
                    </div>
                  </h2>

                  <p>{totalStaked} / 2100</p>
                </div>

                {/* 2 */}
                <div className="flex-col justify-between items-center">
                  <h2 className="text-lg">
                    <div className="flex justify-center items-center space-x-3">
                      <span className="ml-[-27px]">
                        <img
                          className="w-[15px] h-[15px] bg-[#07FEA3] p-[1px]"
                          src={icon2}
                          alt=""
                        />
                      </span>{" "}
                      <span>My Token Balance</span>
                    </div>
                  </h2>

                  <p>{balance} $MUT</p>
                </div>
              </div>
              <div className="flex justify-start items-center">
                {/* 3 */}
                <div className="flex-col justify-between items-center">
                  <h2 className="text-lg">
                    <div className="flex justify-center items-center space-x-3">
                      <span className="ml-[-27px]">
                        <img
                          className="w-[15px] h-[15px] bg-[#07FEA3] p-[1.5px]"
                          src={icon1}
                          alt=""
                        />
                      </span>{" "}
                      <span>The Total Staked</span>
                    </div>
                  </h2>

                  <p>{totalStakedPercentage}%</p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="bg-[#1E2523] flex-col justify-center items-center rounded-[10px] w-[100%] h-[250px] space-y-5
            py-10 pl-9 pr-3 md:px-14"
            >
              <div className="flex justify-between items-center">
                {/* 1 */}
                <div className="flex-col justify-between items-center">
                  <h2 className="text-lg">
                    <div className="flex justify-center items-center space-x-3">
                      <span className="ml-[-27px]">
                        <img
                          className="w-[15px] h-[15px] bg-[#07FEA3] p-[1.5px]"
                          src={icon3}
                          alt=""
                        />
                      </span>{" "}
                      <span>Total Hashrate</span>
                    </div>
                  </h2>

                  <p>{rate} $MUT/block</p>
                </div>

                {/* 2 */}
                <div className="flex-col justify-between items-center">
                  <h2 className="text-lg">
                    <div className="flex justify-center items-center space-x-3">
                      <span className="ml-[-27px]">
                        <img
                          className="w-[15px] h-[15px] bg-[#07FEA3] p-[1.5px]"
                          src={icon4}
                          alt=""
                        />
                      </span>{" "}
                      <span>Total Reward Paidout</span>
                    </div>
                  </h2>

                  <p>{totalPayout} $MUT</p>
                </div>
              </div>
              <div className="flex justify-start items-center">
                {/* 3 */}
                <div className="flex-col justify-between items-center">
                  <h2 className="text-lg">
                    <div className="flex justify-center items-center space-x-3">
                      <span className="ml-[-27px]">
                        <img
                          className="w-[15px] h-[15px] bg-[#07FEA3] p-[1.5px]"
                          src={icon5}
                          alt=""
                        />
                      </span>{" "}
                      <span>Total Earned</span>
                    </div>
                  </h2>

                  <p>{earnings} $MUT</p>
                </div>
              </div>

              <button
                className="stake-button bg-[#07fea3] w-[100%] px-20 mt-3 mb-1 py-2 text-black font-bold"
                onClick={() => {
                  harvest();
                }}
              >
                Claim {earnings} $MUT
              </button>
            </div>
          </div>

          {/* 3 - Menu */}
          <div className="bg-[#1E2523] flex justify-center items-center rounded-[10px] p-4 text-white space-x-20">
            <div
              className={menuState === 1 ? "selected" : "not-selected"}
              onClick={() => {
                setMenuState(1);
              }}
            >
              Wallet
            </div>
            <div
              className={menuState === 2 ? "selected" : "not-selected"}
              onClick={() => {
                setMenuState(2);
              }}
            >
              Staked
            </div>
          </div>

          {/* Main Screen */}
          {/* If Wallet Not Connected */}
          {!walletConnected && (
            <div className="bg-[#1E2523] flex justify-between items-center rounded-[10px] p-6 text-white h-[350px]">
              <div className="p-4 bg-[#1E2523] w-[100%] h-[100%] flex justify-center items-center">
                <button
                  className="connect-wallet-btn"
                  onClick={() => {
                    setWalletConnected(true);
                  }}
                >
                  Connect your wallet
                </button>
              </div>
            </div>
          )}

          {walletConnected && menuState === 1 && wallet.length === 0 && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] p-6 text-white h-[350px]">
              <div className="p-4 bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <button>No NFTs found..</button>
              </div>
            </div>
          )}

          {/* If Wallet Selected And Connected (Show Unstaked Nfts), menuState === 1 */}
          {walletConnected && menuState === 1 && wallet.length > 0 && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] px-3 py-6 text-white">
              <div className=" bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <div className="container">
                  <div className="row">
                    {wallet.map((item, index) => {
                      return (
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                          <Card tokenId={item.toString()} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {walletConnected && menuState === 2 && staked.length === 0 && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] p-6 text-white h-[350px]">
              <div className="p-4 bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <button>No staked NFTs found..</button>
              </div>
            </div>
          )}

          {/* If Wallet Selected And Connected (Show Unstaked Nfts) , menuState === 2*/}
          {walletConnected && menuState === 2 && staked.length > 0 && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] px-3 py-6 text-white">
              <div className=" bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <div className="container">
                  <div className="row">
                    {staked.map((item, index) => {
                      return (
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                          <UnstakeCard tokenId={item.toString()} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
