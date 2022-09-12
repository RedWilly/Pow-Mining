import testimage from "../assets/testimage.png";

export const UnstakeCard = () => {
  return (
    <div className="box-wrapper">
      <img
        className="img-responsive"
        // src={contract_1_NFTs.metadatas[i].image}
        src={testimage}
        alt="NFT"
        width="auto"
        height="280"
      ></img>
      <div className="mt-4 flex-col justify-center items-center">
        <p className="bold ml-[-100px]">NFT Name #782</p>
        <p className="bold ml-[-70px]">Pending rewards: 320</p>
        <p className="bold ml-[-60px]">Last Claimed: 12/06/20</p>
        <div className="flex justify-between items-center space-x-2 mt-2 mb-2">
          <button className="stake-button bg-black w-[100%] rounded-3xl px-6 py-1">
            UNSTAKE
          </button>
          <button className="stake-button bg-black w-[100%] rounded-3xl  px-8 py-1">
            CLAIM
          </button>
        </div>
      </div>
    </div>
  );
};
