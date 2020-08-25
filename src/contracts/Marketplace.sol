pragma solidity ^0.5.0;


contract Marketplace {
    string public name ;

    struct Product {
        uint id;
        string name;
        uint price ;
        address payable owner;
        bool purchased;
    }
    mapping(uint => Product) public products ;
    
    uint public productCount = 0;

    event ProductCreated(
        uint id,
        string name,
        uint price ,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
    uint id,
    string name,
    uint price ,
    address payable owner,
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
    }

    function purchaseProduct(uint _id) public payable {
        //Fetch the Product
        Product memory _product = products[_id];
        //Fetch the owner
        address payable _seller = _product.owner;
        //Make sure the product is valid
        require(_product.id>0 && _product.id <= productCount);
        require(msg.value >= _product.price);
        require(! _product.purchased);
        require(_seller != msg.sender);
        //Transfer ownership
        _product.owner = msg.sender;
        //Mark as purchased
        _product.purchased = true;
        //Update the product in the mapping
        products[_id] = _product;
        //Pay the seller
        address(_seller).transfer(msg.value);
        //Trigger an event
        emit ProductPurchased(_product.id , _product.name , _product.price ,  _product.owner , _product.purchased);
    }


}