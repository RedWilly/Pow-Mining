import testimage from "../assets/testimage.png";
import {stakingProxyCA} from "../config";
import stakeAbi from "../artifacts/contracts/MutantStaking.sol/MutantStaking.json";
import {useWeb3React} from "@web3-react/core";
import {Contract} from "@ethersproject/contracts";
export const UnstakeCard = (props) => {
    const { account, active, error, library, networkId } = useWeb3React();

    let unstake = async tokenId => {
        let stakeContract = new Contract(stakingProxyCA, stakeAbi.abi, library.getSigner());
        await (await stakeContract.withdraw([tokenId])).wait();
        window.location.reload();
    }

    return (
    <div className="box-wrapper">
      <img
        className="img-responsive"
        // src={contract_1_NFTs.metadatas[i].image}
        src={'/nft/images/' + props.tokenId + '.png'}
        alt="NFT"
        width="auto"
        height="280"
      ></img>
      <div className="mt-4 flex-col justify-center items-center">
        <p className="bold ml-[-100px]">Mutants #{props.tokenId}</p>
        <div className="flex justify-between items-center space-x-2 mt-2 mb-2">
          <button className="stake-button bg-black w-[100%] rounded-3xl px-6 py-1" onClick={() => { unstake(props.tokenId) }}>
            Unstake
          </button>
        </div>
      </div>
    </div>
  );
};
