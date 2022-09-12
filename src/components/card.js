import testimage from "../assets/testimage.png";

export const Card = () => {
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
        <p className="bold ml-[-100px]">Mutants #782</p>
        <button className="stake-button bg-black w-[100%] rounded-3xl px-24 mt-3 mb-1 py-2">
          Stake
        </button>
      </div>
    </div>
  );
};
