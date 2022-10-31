const hre = require("hardhat");

async function main() {

  //Get the contact & deploy
  const GimmeDatRose = await hre.ethers.getContractFactory("GimmeDatRose");
  const gimmeDatRose = await GimmeDatRose.deploy();
  await gimmeDatRose.deployed();
  console.log('GimmeDatRose deployed to ', gimmeDatRose.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});