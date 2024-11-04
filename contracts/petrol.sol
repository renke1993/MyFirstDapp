//SPDX-License-Identifier:MIT
pragma solidity ^0.8.13;

contract PetrolExchange {
    address public owner;
    mapping(address => uint) public petrolBalances;

    constructor() {
        owner = msg.sender;
        petrolBalances[address(this)] = 1000;
        }

    function checkBalance() public view returns(uint) {
        return petrolBalances[address(this)];
        }

    function addPetrol(uint amount) public {
        require(msg.sender == owner, "");
        petrolBalances[address(this)] += amount;
    }

    function buyPetrol(uint amount) public payable{
        require(msg.value >= amount * 0.01 ether, "");
        require(amount <= petrolBalances[address(this)], "");

        petrolBalances[address(this)] -= amount;

        petrolBalances[msg.sender] += amount;
    }
}
