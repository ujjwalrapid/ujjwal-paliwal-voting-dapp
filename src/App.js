import React, { useState ,Component, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import photo from './download.png';
import { useWeb3React } from "@web3-react/core";
import { VoteCandidate1,VoteCandidate2,getCandidate1,getCandidate2} from './contract';

function App() {
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
 const [getCount1,setGetCount1]=useState(0);
 const [getCount2,setGetCount2]=useState(0);
  // Button handler button for handling a
  // request event for metamask
  useEffect(()=>{
    getCandidate1(1,setGetCount1);
    getCandidate2(2,setGetCount2)
  },[])
  const btnhandler = () => {
    

    // Asking if metamask is already present or not
    if (window.ethereum) {
  
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
 
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        
        console.log(balance)
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
    console.log(11111,account)
  localStorage.setItem("adddress", JSON.stringify(account));
    // Setting a balance
    getbalance(account);
  };

  return (
    <div>
      <Button onClick={btnhandler} style={{margin:'20px'}} variant="success">Connect Wallet</Button>
      <h3>Vote Count For Candidate 1:-{getCount1}</h3>
      <h3>Vote Count For Candidate 1:-{getCount2}</h3>
      <div className="App" style={{display:'flex',alignItems:'center',justifyContent:'space-around',marginTop:'60px'}}>
       <div >
       <Card style={{ width: '18rem' }}>
      <Card.Img  src={photo} />
      <Card.Body>
        <Card.Title>Candidate 1</Card.Title>
        <Card.Text>
        I'm asking for your vote, to serve you for four more years in the City Council
        </Card.Text>
        <Button onClick={VoteCandidate1} variant="primary">Vote Here</Button>
      </Card.Body>
    </Card>
       </div>
       <div >
       <Card style={{ width: '18rem' }}>
      <Card.Img  src={photo} />
      <Card.Body>
        <Card.Title>Candidate 2</Card.Title>
        <Card.Text>
          I'm asking for your vote, to serve you for four more years in the City Council
        </Card.Text>
        <Button onClick={VoteCandidate2} variant="primary">Vote Here</Button>
      </Card.Body>
    </Card>
       </div>
       </div>
     
       {/* <Button onClick={getCandidate(2)}>Get Info For Candidate 2</Button> */}
    </div>
  );
}

export default App;
