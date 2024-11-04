import ABI from "../ABI.json";

const bank_address = "0xf4055fca9dFEfAb3d66f478E9f2d35b9bE4FA560";

const newBankContract = web3 => {
    return new web3.eth.Contract(ABI, bank_address);
};

export default newBankContract;
