import {useEffect, useState} from "react";
import { Card } from "./components/card";
import { UnstakeCard } from "./components/UnstakeCard";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import {Contract} from "@ethersproject/contracts";
import {nftProxyCA, stakingProxyCA, tokenCA} from "./config";
import nftAbi from './artifacts/contracts/Mutants.sol/Mutants.json'
import stakeAbi from './artifacts/contracts/MutantStaking.sol/MutantStaking.json'
import tokenAbi from './artifacts/contracts/SimpleToken.sol/SimpleToken.json'
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";


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
    let stakeContract = new Contract(stakingProxyCA, stakeAbi.abi, library.getSigner());
    await (await stakeContract.harvest()).wait();
    window.location.reload();
  }

  useEffect( () => {
    (async () => {
      if (account && window.ethereum) {
        setWalletConnected(true);
        let nftContract = new Contract(nftProxyCA, nftAbi.abi, library);
        nftContract.balanceOf(account).then(balance => {
          for(var i = 0;i < balance;i++) {
            nftContract.tokenOfOwnerByIndex(account, i).then(tokenId => {
              let newWallet = wallet;
              newWallet[tokenId] = tokenId.toString();
              setWallet(newWallet);
            })
          }
        });

        nftContract.balanceOf(stakingProxyCA).then(balance => {
          setTotalStaked(balance.toString());
          setTotalStakedPercentage(Math.round(parseInt(balance.toString()) / 8888 * 10000) / 100);
        })

        let tokenContract = new Contract(tokenCA, tokenAbi.abi, library);
        tokenContract.balanceOf(account).then(balance => {
          setBalance(parseFloat(ethers.utils.formatEther(balance.toString())).toFixed(4));
        })

        let stakeContract = new Contract(stakingProxyCA, stakeAbi.abi, library);
        stakeContract.earnings(account).then(earned => {
          setEarnings(parseFloat(ethers.utils.formatEther(earned.toString())).toFixed(4));
        });
        stakeContract.released().then(released => {
          setTotalPayout(parseFloat(ethers.utils.formatEther(released.toString())).toFixed(2));
        });
        stakeContract.rate().then(rate => {
          setRate(parseFloat(ethers.utils.formatEther(rate.toString())).toFixed(2));
        });

        stakeContract.depositsOf(account).then(deposits => {
          let staked = [];
          for(var i in deposits) {
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
      <div className="min-h-screen bg-[#2a303c] px-8 py-2 md:px-32 md:py-6">
        <div className="flex-col justify-center items-center space-y-6">
          {/* 1 - Logo Bar */}
          <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] p-4 text-white">
            <p>LOGO</p>
            <p>Select Wallet</p>
          </div>

          {/* 2 -  Bar */}
          <div className="flex flex-col md:flex-row justify-center items-center text-white md:space-x-4 space-y-4 md:space-y-0 ">
            <div className="bg-[#191d24] flex-col justify-center items-center rounded-[10px] p-4 w-[100%]">
              <p>Mutants Staked</p>
              <p>{totalStaked}/8888</p>
              <p>{totalStakedPercentage}% of the total staked</p>
              <p>My token balance: {balance} $MUT</p>
            </div>
            <div className="bg-[#191d24] flex-col justify-center items-center rounded-[10px] p-4 w-[100%]">
              <p>Total Hashrate: {rate} $MUT/block</p>
              <p>Total Earned: {earnings} $MUT</p>
              <p>Total Reward Paidout: {totalPayout} $MUT</p>
              <button className="stake-button bg-black w-[100%] rounded-3xl px-24 mt-3 mb-1 py-2" onClick={() => { harvest(); }}>
                Claim {earnings} $MUT
              </button>
            </div>
          </div>

          {/* 3 - Menu */}
          <div className="bg-[#191d24] flex justify-between md:justify-start items-center rounded-[10px] p-4 text-white space-x-20">
            <button
              className={menuState === 1 && "selected"}
              onClick={() => {
                setMenuState(1);
              }}
            >
              Wallet
            </button>
            <button
              className={menuState === 2 && "selected"}
              onClick={() => {
                setMenuState(2);
              }}
            >
              Staked
            </button>
          </div>

          {/* Main Screen */}
          {/* If Wallet Not Connected */}
          {!walletConnected && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] p-6 text-white h-[350px]">
              <div className="p-4 bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <button
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
                  <button>
                    No NFTs found..
                  </button>
                </div>
              </div>
          )}

          {/* If Wallet Selected And Connected (Show Unstaked Nfts), menuState === 1 */}
          {walletConnected && menuState === 1 && wallet.length > 0 && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] px-3 py-6 text-white">
              <div className=" bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <div className="container">
                  <div className="row">
                    {wallet.map((item,index)=>{
                      return <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                        <Card tokenId={item.toString()} />
                      </div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {walletConnected && menuState === 2 && staked.length === 0 && (
              <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] p-6 text-white h-[350px]">
                <div className="p-4 bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                  <button>
                    No staked NFTs found..
                  </button>
                </div>
              </div>
          )}

          {/* If Wallet Selected And Connected (Show Unstaked Nfts) , menuState === 2*/}
          {walletConnected && menuState === 2 && staked.length > 0 && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] px-3 py-6 text-white">
              <div className=" bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <div className="container">
                  <div className="row">
                    {staked.map((item,index) => {
                      return <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                        <UnstakeCard tokenId={item.toString()} />
                      </div>
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
