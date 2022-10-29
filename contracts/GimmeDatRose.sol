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

  //List of all memos received from lovers!
  Memo[] memos;

  //Address of contract deployer
  address payable owner;

  //Deploy Logic
  constructor() {
    owner = payable(msg.sender);
  }

  /**
  * @dev Give a Rose to the contract owner
  * @param _name name of the rose giver!
  * @param _message a fabulous message from the rose giver
   */

   function giveRose(string memory _name, string memory _message) public payable {

    require(msg.value > 0, "A rose could cost you more than 0 eth!");

    //Add the memo to storage!
    memos.push(Memo(
      msg.sender,
      block.timestamp,
      _name,
      _message
    ));

   }

}
