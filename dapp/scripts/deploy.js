const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const RoomsFactory  = await hre.ethers.getContractFactory("Rooms");
  const rooms  = await RoomsFactory.deploy();
  await rooms.waitForDeployment();
  const roomAddress = await rooms.getAddress();
  console.log("rooms contract deployed to:", roomAddress);

  // const TownMapFactory = await hre.ethers.getContractFactory("TownMaps");
  // const townMap = await TownMapFactory.deploy(townAddress);
  // await townMap.waitForDeployment();
  // console.log("townMap deployed to:", await townMap.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
