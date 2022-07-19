import Web3 from "web3";
import { addressForVote } from './address';
import { abiForVote } from './abi';

const web3 = new Web3(Web3.givenProvider);

const voteContract =new web3.eth.Contract(
    abiForVote,addressForVote
);
 export const getCandidate1=async(id,setGetCount1)=>{
    const CandidatesData = await voteContract.methods.candidates(id).call();
    console.log(CandidatesData.voteCount);
    setGetCount1(CandidatesData.voteCount);
    return CandidatesData.voteCount
 }
 export const getCandidate2=async(id,setGetCount2)=>{
    const CandidatesData = await voteContract.methods.candidates(id).call();
    console.log(CandidatesData.voteCount);
    setGetCount2(CandidatesData.voteCount);
    return CandidatesData.voteCount
 }

export const VoteCandidate1=async()=>{
  const UserAddress = JSON.parse(`${localStorage.getItem("adddress")}`);
  console.log("333",UserAddress);
    try {
        const sellItem = await voteContract.methods.vote(1).send({ from: UserAddress });
    } catch (error) {
        console.log(error)
    }
}

export const VoteCandidate2=async()=>{
    const UserAddress = JSON.parse(`${localStorage.getItem("adddress")}`);
    console.log("333",UserAddress);
      try {
          const sellItem = await voteContract.methods.vote(2).send({ from: UserAddress });
      } catch (error) {
          console.log(error)
      }
  }