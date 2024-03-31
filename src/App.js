import {useState,useEffect} from 'react';
import Web3 from 'web3';
// import { Web3Auth } from "@web3auth/modal";
// import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';



let styles = {
  button: {
    width: "100%",
    maxWidth: 200,
    cursor: "pointer",
    background: "#0164FF",
    boxSizing: "border-box",
    borderRadius: "15px",
    fontSize: 16,
    color: "#f9f9f9",
    fontWeight: 700,
    padding: "12px 30px 12px 30px",
    marginTop: 4,
    display: "flex",
    justifyContent: "center",
    border: "none",
  },
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    width: 400,
    height: "100%",
    minHeight: 200,
    border: "10px solid #f9f9f9",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
  },
};


function App() {
  
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const [account, setAccount] = useState("");
  
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };
  
  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount  =await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setAccount(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
      }
    } catch(err) {
      console.log(err);
    }
  }
  
  const onDisconnect = () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
      setIsConnected(false);
      setAccount("");
      setEthBalance("");
    };
  
  return (
    <div className="app" style={{ fontFamily: "Bombshell Pro, sans-serif" }}>
      <div className="app-header" style={{ marginTop: "50px" }}>
        <h1 style={{ textAlign: "center", color: "darkorange" }} >React dApp authentication with React, We3.js and Metamask</h1>

      </div>
      <div className="app-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        {!isConnected && (
          <div>
            <button className="btn btn-primary" onClick={onConnect} style={{ fontSize: "20px", marginTop: "-300px" }}>
              Login with Metamask
              <li><a href="web3_pag_red_social\index.html">Login with MetaMask</a></li>
            </button>
          </div>
        )}
        {isConnected && (
          <div className="app-wrapper">
            <div className="app-details">
              <h2 style={{ textAlign: "center" }}> You are connected to metamask.</h2>
              <div className="app-balance" style={{ textAlign: "center" }}>
                <span>Balance: </span>
                {ethBalance}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn btn-danger" onClick={onDisconnect}>
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
        }

export default App;