require("hardhat-deploy");
require("hardhat-deploy-ethers");

const { networkConfig } = require("../helper-hardhat-config");

const private_key = network.config.accounts[0];
const wallet = new ethers.Wallet(private_key, ethers.provider);

module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address);
    const chainId = network.config.chainId;

    // Deploy ModelService
    const ModelService = await ethers.getContractFactory("ModelService", wallet);
    console.log("Deploying ModelService...");
    const modelService = await ModelService.deploy();
    await modelService.deployed();
    console.log("ModelService deployed to:", modelService.address);

    // Deploy FilecoinMarketConsumer
    const FilecoinMarketConsumer = await ethers.getContractFactory(
        "FilecoinMarketConsumer",
        wallet
    );
    console.log("Deploying FilecoinMarketConsumer...");
    const filecoinMarketConsumer = await FilecoinMarketConsumer.deploy();
    await filecoinMarketConsumer.deployed();
    console.log(
        "FilecoinMarketConsumer deployed to:",
        filecoinMarketConsumer.address
    );

    // Deploy DealRewarder
    const DealRewarder = await ethers.getContractFactory("DealRewarder", wallet);
    console.log("Deploying DealRewarder...");
    const dealRewarder = await DealRewarder.deploy();
    await dealRewarder.deployed();
    console.log("DealRewarder deployed to:", dealRewarder.address);

    // Deploy DealClient
    const DealClient = await ethers.getContractFactory("DealClient", wallet);
    console.log("Deploying DealClient...");
    const dc = await DealClient.deploy();
    await dc.deployed();
    console.log("DealClient deployed to:", dc.address);
};
