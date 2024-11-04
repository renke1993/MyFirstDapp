// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import ethers from 'ethers';
import Web3 from 'web3';
import newBankContract from "./blockchain/bankContract";

function App() {

  const [web3, setWeb3] = useState(null); // useState修改组件内状态的hoo
  const [address, setAddress] = useState(null);
  const [bankContract, setBankContract] = useState(null);
  const [myDeposit, setMyDeposit] = useState(null);
  const [amount, setAmount] = useState();
  const [receiveAddress, setReceiveAddress] = useState();
  

  const getMyDeposit = async() => {
    const depositCount = await bankContract.methods.myBalance().call({
      from : address
    });
    console.log("myDeposit is :", depositCount);
    setMyDeposit(""+depositCount);
  };

  const newNumber = (event) => {
    setAmount(event.target.value);
  };
  const newAddress = (event) => {
    setReceiveAddress(event.target.value);
  };

  const deposit = async() => {
    await bankContract.methods.deposit(amount).send({
      from : address
    });
  };

  const withdraw = async() => {
    await bankContract.methods.withdraw(amount).send({
      from : address
    });
  };

  const transfer = async() => {
    await bankContract.methods.bankTransfer(amount, receiveAddress).send({
      from : address
    });
  };

  const connectWallet = async() => {
    // 请求链接钱包
    const account = await window.ethereum.request({
      method:'eth_requestAccounts'
    });
    // 抓取web3文件
    const web3 = new Web3(window.ethereum);
    setWeb3(web3);
    // 抓取钱包账号地址
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    setAddress(accounts[0]);

    // 抓取智能合约
    const pt = newBankContract(web3);
    setBankContract(pt);
  };

  return (
    <body className='body' style={{height:'100vh'}}>
    <div className="App bg-img">
      <div className='card'>
        <h1 className='h1'>REN KE BANK</h1>
        <button className='button' onClick={connectWallet}>connect wallet</button>
      <h3 className='h3'>账户地址-Address:{address}</h3>

      <section>
        <div>
          <p className='h3'>银行余额:{myDeposit} <button onClick={getMyDeposit}>查询</button> </p>
        </div>
      </section>
      
      <section>
        <div>
        <p className='h3'>金额：<input className='input' onChange={newNumber} type='type'/>
        <button onClick={deposit}>存钱</button></p>
        </div>
      </section>
      <section>
        <div>
        <p className='h3'>金额：<input className='input' onChange={newNumber} type='type'/>
          <button onClick={withdraw}>取钱</button></p>
        </div>
      </section>
      <section>
        <div>
          <p className='p1'>转账地址：<input className='input' onChange={newAddress} type='type'/></p>
          <p className='p2'>转账金额：<input className='input' onChange={newNumber} type='type'/><button onClick={transfer}>转账</button></p>
        </div>
      </section>
      </div>
    </div></body>
  );
}

export default App;
