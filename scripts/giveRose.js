// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

/**
 * @dev helper Functions
 */
//Returns the Ether balance of a given address - waffle.provider is a node that connect to blockchain, even test environment
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
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
    const donner = memo.name;
    const donnerAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${donner} (${donnerAddress}) said: "${message}"`)
  }
}


async function main() {

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
