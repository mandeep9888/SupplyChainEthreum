module.exports = function(app) {
    console.log("#############################################################I am in CRUD##########");
    multipart = require('connect-multiparty');
    multipartMiddleware = multipart();
    session = require('express-session');
    cookieParser = require('cookie-parser');
    fs = require('fs');
    path = require('path');
    request = require('request');
    http = require('http');
    async = require('async');
    assert = require('assert');
    var http = require('http');
    var formidable = require('formidable');
    var exec = require('child_process').exec;
    var RLP = require('rlp');
    variables = require('../variables');
    Web3 = require('web3');
    solc = require('solc');
    cors = require('cors');
    'use strict';
    EthIP = variables.host_rpc_ip;
    EthRPCPort = variables.host_rpc_port;
    console.log("EthRPCPort :", EthRPCPort);
    if (EthIP == null || EthIP.length === 0) {
        EthIP = "0.0.0.0";
    }
    if (EthRPCPort == null || EthRPCPort.length === 0) {
        EthRPCPort = "80";
    }
    console.log("EthIP :", EthIP);
    console.log("EthRPCPort :", EthRPCPort);
    try {
        var web3 = new Web3(new Web3.providers.HttpProvider("http://" + EthIP + ":" + EthRPCPort));
    } catch (e) {
        console.log(e);
    } finally {
        console.log("web3 status >> ", web3.isConnected());
    }
    console.log("accounts :",web3.eth.accounts);

    
    app.post("/createShipment", multipartMiddleware, function(req, res, next) {

        console.log("request >>> ", req.body);
        
        var shipmentID = req.body.shipmentID;
        var sellerID = req.body.sellerID;
        var buyerID = req.body.buyerID;
        var shipperID = req.body.shipperID;
        var shipmentstatusString = req.body.shipment_status;
        var shipmentStatus;
        if(shipmentstatusString == 'With Seller')
        {
            shipmentStatus = 0;
        }
       
        var temperatureStatus = 0;
        var addressSC = variables.SCAddress;
        var Contract = web3.eth.contract(JSON.parse(variables.SCHAINABI));
        var contractSC = Contract.at(addressSC);

        var creator = web3.eth.accounts[0] + "";

        contractSC.createShipment.sendTransaction(shipmentID, sellerID, buyerID, shipperID, shipmentStatus, temperatureStatus, {
            from: web3.eth.accounts[0],
            gas: 200000
        }, function(error, result) {
            if (!error) {
                console.log("Transaction Hash = " + result);
                var obj = {}
                obj.apiName= "createShipment";
                obj.dataUploaded = {
                    "shipmentID" : shipmentID,
                    "sellerID" : sellerID,
                    "buyerID" : buyerID,
                    "shipperID" : shipperID,
                    "shipmentStatus" : shipmentStatus,
                    "temperatureStatus" : temperatureStatus
                }
                obj.TransactionHash = result;

                res.send(obj);
            } else {
                console.log("Error Occured");
                console.log(error);
                res.send(error);
            }
        });

    }); // ending of createShipment

    app.post("/updateShipment", multipartMiddleware, function(req, res, next) {
        var shipmentStatus;
        console.log("inside updateShipment");
        console.log("request>> ", req.body);
        
        
        var shipmentID = req.body.shipmentID;
        var shipmentStatusStr = req.body.shipmentStatus;
        if(shipmentStatusStr == "In Transit")
        {
            shipmentStatus = 1;
        }
        else if (shipmentStatusStr == "Delivered") {
            shipmentStatus = 2;
        }
        else if(shipmentStatusStr == "With Seller")
        {
            shipmentStatus = 0;
        }
        else
        {
            shipmentStatus = req.body.shipmentStatus;
        }


        var addressSC = variables.SCAddress;
        var Contract = web3.eth.contract(JSON.parse(variables.SCHAINABI));
        var contractSC = Contract.at(addressSC);

        contractSC.updateShipment.sendTransaction(shipmentID,shipmentStatus, {
            from: web3.eth.accounts[0],
            gas: 200000
        }, function(error, result) {
            if (!error) {
                console.log("Transaction Hash = " + result);
                var obj = {}
                obj.apiName= "updateShipment";
                obj.dataUploaded = {
                    "shipmentID" : shipmentID,
                    "shipmentStatus" : shipmentStatus                }
                obj.TransactionHash = result;
                console.log("result >> ",result);
                
                res.send(obj);
            } else {
                console.log("Error Occured");
                console.log(error);
                res.send(error);
            }
        });

    }); // ending of updateShipment

    app.post("/updateTemperatureStatus", multipartMiddleware, function(req, res, next) {

        console.log("inside UpdateTemperature with request > ", req.body);
        
        var shipmentID = req.body.shipment_ID;
        var temperatureStatus = 0;
        var addressSC = variables.SCAddress;
        var Contract = web3.eth.contract(JSON.parse(variables.SCHAINABI));
        var contractSC = Contract.at(addressSC);
        var outofRange = 0;
        var inrange = 0;
        
        function inFunc() {
            var temp =  variables.TemperatureArray;
            var item = temp[Math.floor(Math.random()*temp.length)];
            console.log(item);
            
            if(item > 20)
            {
                outofRange++;
                
            }
            else
            {
                inrange ++;
            }
            
        }
    setTimeout(()=>{
                inFunc();
                inFunc();
                inFunc();
            if(outofRange > inrange)
            {
                temperatureStatus =  1;
            }
            console.log("shipmentID > ", shipmentID, "temperaturestatus > ", temperatureStatus);
            
            contractSC.updateTemperatureStatus.sendTransaction(shipmentID, temperatureStatus, {
                from: web3.eth.accounts[0],
                gas: 200000
            }, function(error, result) {
                if (!error) {
                console.log("Transaction Hash = " + result);
                var obj = {}
                obj.apiName= "updateTemperatureStatus";
                obj.dataUploaded = {
                    "shipmentID" : shipmentID,
                    "temperatureStatus" : temperatureStatus
                    }
                obj.TransactionHash = result;
                res.send(obj);
                } else {
                    console.log("Error Occured");
                    console.log(error);
                    res.send(error);
                }
            });

        }, 5000);
       
    }); // ending of updateTemperatureStatus

// ##########################   direct Blockchain calls below ##################################

      app.get("/getShipmentByID", function (req, res) {
      console.log("inside getShipmentByID");
        var shipmentIDReq=req.query.shipmentID;
        console.log(shipmentIDReq);
        
        var addressSC = variables.SCAddress;
        var Contract = web3.eth.contract(JSON.parse(variables.SCHAINABI));
        var contractSC = Contract.at(addressSC);

    contractSC.getShipmentByID.call(shipmentIDReq,{
        from: web3.eth.accounts[0],
        fromBlock: 0,
        toBlock: "latest"
        },function(error, result){
        if (!error) {
            console.log("result = " + result);
            var arr=result;
            var obj = {}
            obj.apiName = "getShipmentByID";
            obj.shipmentID = shipmentIDReq;
            obj.dataUploaded = {
                "sellerID" : arr[0],
                "buyerID" : arr[1],
                "shipperID" : arr[2],
                "shipmentStatus" : arr[3],
                "temperatureStatus" : arr[4],
                "temperatureBreached" : arr[5]
            }
            console.log(obj);
            
            res.send(obj);
            // console.log(JSON.stringify(result));
            // res.send(JSON.stringify(result));
        } else {
            console.log("Error Occured");
            console.log(error);
            res.send(error);
        }
         });
      });

}
