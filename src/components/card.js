import {Contract} from "@ethersproject/contracts";
import {useWeb3React} from "@web3-react/core";
import {nftProxyCA, stakingProxyCA} from "../config";
import stakeAbi from "../artifacts/contracts/MutantStaking.sol/MutantStaking.json";
import nftAbi from "../artifacts/contracts/Mutants.sol/Mutants.json";

export const Card = (props) => {
    const { account, active, error, library, networkId } = useWeb3React();

    let stake = async tokenId => {
        let nftContract = new Contract(nftProxyCA, nftAbi.abi, library.getSigner());
        let approved = await nftContract.isApprovedForAll(account, stakingProxyCA);

        if(!approved) {
            await (await nftContract.setApprovalForAll(stakingProxyCA, true)).wait();
        }

        let stakeContract = new Contract(stakingProxyCA, stakeAbi.abi, library.getSigner());
        await (await stakeContract.deposit([tokenId])).wait();
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
        <p className="bold ml-[-100px]">POW Pirates #{props.tokenId}</p>
        <button className="stake-button bg-black w-[100%] rounded-3xl px-24 mt-3 mb-1 py-2" onClick={() => { stake(props.tokenId) }}>
          Stake
        </button>
      </div>
    </div>
  );
};
