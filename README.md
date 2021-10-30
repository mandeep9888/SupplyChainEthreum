# Supply Chain Management on Ethereum

    Improving Supply chain systems offers benefits to quality, cost, and regulatory compliance, but interoperability between organisations is an obstacle. This project addresses the issue of interoperability through the introduction of blockchain technology, implementing a complex supply chain model from literature on the Ethereum platform.

    The process of translating a supply chain network model to an implementation is described in detail; coupled with the the complexity of the network model chosen, this allows the system to be generalised well to a variety of supply chain use cases. The system includes infrastructure, application and integration layers, providing an end-to-end reference implementation for creation of supply chain systems in enterprise.

# How it works :
    “Supply Chain Management on Ethereum”, Using this supply chain management we can view the complete journey of shipment from the manufacturer(Seller) to Distributor (Buyer). To make it more realistic I have added additional tests with the shipment i.e. temprature check for perishable goods. This each phase of shipment, shipment status is updated and stored in the blockchain. This Supply chain also allows buyer to accept or reject the shipment. Through blockchain technology we can create a trusted, transparent system of this supply chain.

Steps to run the application :

    1 : npm install 
    2 : npm install ganache-cli
    3 : run ganache-cli
    4 : npm start (it will start the server on 8090)
    5 : go inside ethdeploye
    6 : npm install -g truffle 
    7 : truffle compile
    8 : truffle migrate 
    9 : copy contract address and paste into  varibales.js
    10 : hit a post req

Assumed Shipment status In backend : These statuses are stored as number balues in the contract to avoid unnecessary space consumption.

	0 : With Seller
	1 : In Transit
	2 : Delivered
	3 : Accepted
	4 : Rejected



Assumed Temperature Status : 

	0 : within range for current cycle
	1 : outside range for current cycle	


