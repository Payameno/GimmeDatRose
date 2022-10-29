// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract GimmeDatRose {

  // Event to emit when a Memo is created
  event NewMemo(
    address indexed from,
    uint256 timestamp,
    string name,
    string message
  );

  //Memo struct
  struct Memo {
    address from;
    uint256 timestamp;
    string name;
    string message;
  }

  //Address of contract deployer
  address payable owner;
  
}
