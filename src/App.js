import { useState } from "react";
import { Card } from "./components/card";
import { UnstakeCard } from "./components/UnstakeCard";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // Unstaked = 1 , Staked = 2
  const [menuState, setMenuState] = useState(1);
  const [walletConnected, setWalletConnected] = useState(false);
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
              <p>4322/8888</p>
              <p>43% of the total staked</p>
            </div>
            <div className="bg-[#191d24] flex-col justify-center items-center rounded-[10px] p-4 w-[100%]">
              <p>Total Hashrate: 150MH/s</p>
              <p>Total Earned: 10 $MUT</p>
              <p>Total Reward Paidout: 920k $MUT</p>
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

          {/* If Wallet Selected And Connected (Show Unstaked Nfts), menuState === 1 */}
          {walletConnected && menuState === 1 && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] px-3 py-6 text-white">
              <div className=" bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <Card />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <Card />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <Card />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <Card />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <Card />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <Card />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* If Wallet Selected And Connected (Show Unstaked Nfts) , menuState === 2*/}
          {walletConnected && menuState === 2 && (
            <div className="bg-[#191d24] flex justify-between items-center rounded-[10px] px-3 py-6 text-white">
              <div className=" bg-[#2a303c] w-[100%] h-[100%] flex justify-center items-center">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <UnstakeCard />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <UnstakeCard />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <UnstakeCard />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <UnstakeCard />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <UnstakeCard />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5">
                      <UnstakeCard />
                    </div>
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
