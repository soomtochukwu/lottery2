const
    { network } = require("hardhat"),
    { verify } = require("../utils/verify");

require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
    const
        { deployer } = await getNamedAccounts(),
        { deploy } = await deployments,
        { chainId } = network.config.chainId;

    // deploy our contracts
    const
        BUNNLottery = await deploy("BUNNLottery", {
            from: deployer,
            args: [5792],
            log: true,
            waitConfirmations: network.config.blockConfirmations,
        })

    // verify our contact
    const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
    if (chainId !== 31337 && ETHERSCAN_KEY) {
        await verify(
            BUNNLottery.address,
            [5792],
            "contracts/BUNNLottery.sol:BUNNLottery"
        )
    }
}

module.exports.tags = ["all", "nft"]