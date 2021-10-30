pragma solidity ^0.4.20;

contract Logistics {

    //here goes he variables
    uint256 shipmentCount=0;


    //here goes the shipment structure
    struct Shipment {
        string shipmentID;
        string sellerID;
        string buyerID;
        string shipperID;
        uint shipmentStatus;
        uint temperatureStatus;
        bool temperatureBreached;

    }

    // here goes the mappings
    mapping(string => Shipment) private ShipmentList;

    //here goes all the events happining
    event createShipmentevent(
           string indexed shipmentID,
            string sellerID,
            string buyerID,
            string shipperID,
            uint shipmentStatus,
            uint temperatureStatus
    );

    event shipmentUpdateEvent(
            string indexed shipmentID,
            string sellerID,
            string buyerID,
            string shipperID,
            uint shipmentStatus,
            uint temperatureStatus
    );

    event temperatureBreachedEvent(
            string indexed shipmentID,
            string breachedTxt
    );

    event getShipmentEvent(
            string indexed shipmentID,
            string sellerID,
            string buyerID,
            string shipperID,
            uint shipmentStatus,
            uint temperatureStatus,
            bool temperatureBreached
    );


    function createShipment(string _shipmentID, string _sellerID, string _buyerID, string _shipperID, uint _shipmentStatus, uint _temperatureStatus ) public
    {
        shipmentCount++;
        Shipment memory shipment;
        shipment.shipmentID = _shipmentID;
        shipment.sellerID = _sellerID;
        shipment.buyerID = _buyerID;
        shipment.shipperID = _shipperID;
        shipment.shipmentStatus = _shipmentStatus;
        shipment.temperatureStatus = _temperatureStatus;
        shipment.temperatureBreached = false;
        
        ShipmentList[_shipmentID] = shipment;

       // emitShipmentEvents(shipmentId);
        emit createShipmentevent(ShipmentList[_shipmentID].shipmentID, ShipmentList[_shipmentID].sellerID, ShipmentList[_shipmentID].buyerID, ShipmentList[_shipmentID].shipperID, ShipmentList[_shipmentID].shipmentStatus, ShipmentList[_shipmentID].temperatureStatus);

    }

    function updateShipment(string _shipmentID, uint _shipmentStatus) public
    {
        Shipment storage shipment = ShipmentList[_shipmentID];
        shipment.shipmentStatus = _shipmentStatus;
        ShipmentList[_shipmentID] = shipment;
        emit shipmentUpdateEvent(ShipmentList[_shipmentID].shipmentID, ShipmentList[_shipmentID].sellerID, ShipmentList[_shipmentID].buyerID, ShipmentList[_shipmentID].shipperID, ShipmentList[_shipmentID].shipmentStatus, ShipmentList[_shipmentID].temperatureStatus);
    }


    function updateTemperatureStatus(string _shipmentID, uint _temperatureStatus) public
    {
        Shipment storage shipment = ShipmentList[_shipmentID];
        shipment.temperatureStatus = _temperatureStatus;
        if(_temperatureStatus == 1 )
        {
            shipment.temperatureBreached = true;

            emit temperatureBreachedEvent(_shipmentID, "temperature Breached");
        }
        else
        {
            emit temperatureBreachedEvent(_shipmentID, "temperature in range");

        }
        
        ShipmentList[_shipmentID] = shipment;
        

    }


    function getShipmentByID(string _shipmentID) public view returns(string _sellerID, string _buyerID, string _shipperID, uint _shipmentStatus, uint _temperatureStatus, bool _temperatureBreached)
    {
        Shipment storage shipment = ShipmentList[_shipmentID];

        _sellerID=shipment.sellerID;
        _buyerID=shipment.buyerID;
        _shipperID=shipment.shipperID;
        _shipmentStatus=shipment.shipmentStatus;
        _temperatureStatus= shipment.temperatureStatus;
        _temperatureBreached=shipment.temperatureBreached;

        return (_sellerID, _buyerID, _shipperID, _shipmentStatus, _temperatureStatus, _temperatureBreached);
        emit getShipmentEvent(_shipmentID, ShipmentList[_shipmentID].sellerID, ShipmentList[_shipmentID].buyerID, ShipmentList[_shipmentID].shipperID, ShipmentList[_shipmentID].shipmentStatus, ShipmentList[_shipmentID].temperatureStatus, ShipmentList[_shipmentID].temperatureBreached);
    }



}
