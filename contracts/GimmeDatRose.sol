// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//Deployed to Goerly at 0x019c47664a626f0B16CE5933B80B5e16E2Ad4B54

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
  * @dev Give a rose to the contract owner
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

  //Emit a log event when memo is created
    emit NewMemo(msg.sender, block.timestamp, _name, _message);

   }

   /**
    * @dev Give a bouquet of roses to the contract owner
    * @param _name name of the rose giver!
    * @param _message a message from the bouquet giver
     */

    function giveBouquet(string memory _name, string memory _message) public payable {

    require(msg.value > 0, "A Bouquet of roses could cost you more than 0 eth!");

    //Add the memo to storage!
    memos.push(Memo(
      msg.sender,
      block.timestamp,
      _name,
      _message
    ));

  //Emit a log event when memo is created
    emit NewMemo(msg.sender, block.timestamp, _name, _message);

   }

  /**
  * @dev Send the entire balance stored in this contract to the owner
   */
   function withdrawRoses() public {
    require(owner.send(address(this).balance));
   }

     /**
  * @dev Retrieved all memos received & stored on the blockchain
   */
   function getMemos() public view returns(Memo[] memory) {
      return memos;
   }

}
