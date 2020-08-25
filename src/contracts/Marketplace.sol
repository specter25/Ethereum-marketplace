pragma solidity ^0.5.0;


contract Marketplace {
    string public name ;

    struct Product {
        uint id;
        string name;
        uint price ;
        address owner;
        bool purchased;
    }
    mapping(uint => Product) public products ;
    
    uint public productCount = 0;

    event ProductCreated(
        uint id,
        string name,
        uint price ,
        address owner,
        bool purchased
    );

    constructor () public {
        name="My name is Ujjwal Agarwal";
    }

    function createProduct( string memory _name , uint _price) public{

        //Require a valid name
        require(bytes(_name).length >0);
        //Require a valid price
        require(_price >0);
        //Increment product Count
        productCount ++ ;
        //create  a product 
        products[productCount] = Product(productCount , _name , _price, msg.sender , false);
        //trigger an event
        emit ProductCreated(productCount , _name , _price, msg.sender , false);
        //Trigger the event
    }


}