const hre = require("hardhat");

/**
helper Functions
 */
//Returns the Ether balance of a given address - waffle.provider is a node that connect to blockchain, even test environment
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  //we take the balance in bigInt and using utils within ethers package, we transform it into a readable format
  return hre.ethers.utils.formatEther(balanceBigInt);
}


//Logs the Ether balances for a list of addresses
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

// Logs the memos stored on-chain from giving roses.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const gifter = memo.name;
    const gifterAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${gifter} (${gifterAddress}) said: "${message}"`)
  }
}

async function main() {

  //Get example accounts
  //Addresses are named arbitrarily
  const [owner, gifter, gifter2, gifter3] = await hre.ethers.getSigners();

  //Get the contract & deploy
  const GimmeDatRose = await hre.ethers.getContractFactory("GimmeDatRose");
  const gimmeDatRose = await GimmeDatRose.deploy();
  await gimmeDatRose.deployed();
  console.log('GimmeDatRose deployed to ', gimmeDatRose.address);

  //Check balances before the bouquet purchase
  const addresses = [owner.address, gifter.address, gimmeDatRose.address];
  console.log('== start ==');
  await printBalances(addresses)

  //Buy the ownwer a rose
  const bouquet = {value: hre.ethers.utils.parseEther("6")};
  await gimmeDatRose.connect(gifter).giveBouquet("Carolina", "You're the best!", bouquet);
  await gimmeDatRose.connect(gifter2).giveBouquet("Vitto", "Amazing friend", bouquet);
  await gimmeDatRose.connect(gifter3).giveBouquet("Kay", "This is from your family", bouquet);

  //Check balances after coffe purchase
  console.log('== Bouquet Given ==');
  await printBalances(addresses)

  //Withdraw funds
  await gimmeDatRose.connect(owner).withdrawRoses();


  //Check balance after withdraw
  console.log('== Withdraw Gifts ==');
  await printBalances(addresses)

  //Read all the memos left for the owner
  console.log("== Memos ==");
  const memos = await gimmeDatRose.getMemos();
  printMemos(memos);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
