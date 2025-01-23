// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract GarageChain {
    // Enums for Car and Transaction statuses
    enum CarStatus { Available, Sold, Shipped, Cancelled }
    enum TransactionStatus { Initialized, PaymentReceived, Shipped, Cancelled }

    // Struct for Cars
    struct Car {
        uint carId;
        string name;
        string description;
        uint price;
        address payable seller;
        CarStatus status;
    }

    // Struct for Transactions
    struct Transaction {
        uint transactionId;
        uint carId;
        address buyer;
        address seller;
        TransactionStatus status;
        string shippingReceipt;
    }

    // State variables
    mapping(uint => Car) public cars; // Stores all cars
    uint public carCounter; // Counter for unique car IDs
    mapping(uint => Transaction) public transactions; // Stores all transactions
    uint public transactionCounter; // Counter for unique transaction IDs

    // Events
    event CarRegistered(uint indexed carId, address indexed seller);
    event CarPurchased(uint indexed transactionId, uint indexed carId, address indexed buyer, uint price);
    event ShippingReceiptAdded(uint indexed transactionId, uint indexed carId, string shippingReceipt);
    event CarCancelled(uint indexed carId);

    // Modifiers
    modifier onlySeller(uint carId) {
        require(cars[carId].seller == msg.sender, "Only the seller can perform this action.");
        _;
    }

    modifier isAvailable(uint carId) {
        require(cars[carId].status == CarStatus.Available, "Car is not available.");
        _;
    }

    modifier validTransactionId(uint transactionId) {
        require(transactions[transactionId].transactionId == transactionId, "Invalid transaction ID.");
        _;
    }

    // Register a car for sale
    function registerCar(string memory name, string memory description, uint price) external returns (uint) {
        require(price > 0, "Price must be greater than zero.");
        uint carId = carCounter++;
        cars[carId] = Car(carId, name, description, price, payable(msg.sender), CarStatus.Available);
        emit CarRegistered(carId, msg.sender);
        return carId;
    }

    // Purchase a car
    function buyCar(uint carId) external payable isAvailable(carId) returns (uint) {
    Car storage car = cars[carId];
    require(msg.value == car.price, "Incorrect payment amount.");

    uint transactionId = transactionCounter++;
    transactions[transactionId] = Transaction(
        transactionId,
        carId,
        msg.sender,
        car.seller,
        TransactionStatus.PaymentReceived,
        ""
    );

    car.seller.transfer(msg.value); // Transfer payment to the seller
    car.status = CarStatus.Sold;

    emit CarPurchased(transactionId, carId, msg.sender, car.price);
    return transactionId;
}


    // Input shipping receipt
    function inputShippingReceipt(uint transactionId, string memory shippingReceipt)
        external
        validTransactionId(transactionId)
        returns (bool)
    {
        Transaction storage transaction = transactions[transactionId];
        require(transaction.seller == msg.sender, "Only the seller can input the shipping receipt.");
        require(transaction.status == TransactionStatus.PaymentReceived, "Payment not received yet.");

        transaction.status = TransactionStatus.Shipped;
        transaction.shippingReceipt = shippingReceipt;
        cars[transaction.carId].status = CarStatus.Shipped;

        emit ShippingReceiptAdded(transactionId, transaction.carId, shippingReceipt);
        return true;
    }

    // Cancel a car listing
    function cancelCarListing(uint carId) external onlySeller(carId) isAvailable(carId) returns (bool) {
        cars[carId].status = CarStatus.Cancelled;
        emit CarCancelled(carId);
        return true;
    }

    // Retrieve car details
    function getCar(uint carId) external view returns (Car memory) {
        return cars[carId];
    }

    // Retrieve transaction details
    function getTransaction(uint transactionId) external view returns (Transaction memory) {
        return transactions[transactionId];
    }
}
