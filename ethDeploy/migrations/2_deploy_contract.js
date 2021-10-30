var MyContract = artifacts.require("Logistics");

module.exports = function(deployer)
		{
		deployer.deploy(MyContract);
		};
