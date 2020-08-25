const { assert } = require('chai');

const Marketplace = artifacts.require('./Marketplace.sol')
require('chai').use(require('chai-as-promised')).should()

contract('Marketplace' , ([deployer , seller , buyer])=>{
  let marketplace;

  before(async ()=>{
    marketplace = await Marketplace.deployed();
  })

  describe('deployment', async () => {
    it('deploys successfully' , async ()=> {
      const address = await marketplace.address ; 
      assert.notEqual(address , 0*0)
      assert.notEqual(address , '')
      assert.notEqual(address , null)
      assert.notEqual(address , undefined)
      
    })

    it(' has a name' , async () =>{
      const name = await marketplace.name( );
      assert .equal(name,'My name is Ujjwal Agarwal')
    })
  })
  describe('products', async() => {
    let result , postCount;

    before(async()=>{
      result = await marketplace.createProduct('iPhone X' , web3.utils.toWei('1','Ether') , {from:seller})
      productCount = await marketplace.productCount();
    })

    it ('creates products' , async () =>{
      assert.equal(productCount, 1)
      // console.log(result.logs)

      //SUCCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber() , productCount.toNumber() , 'id is correct');
      assert .equal(event.name,'iPhone X' , 'name is correct')
      assert .equal(event.price, web3.utils.toWei('1', 'Ether') ,'price is correct')
      assert .equal(event.owner, seller , 'owner is correct')
      assert .equal(event.purchased, false , 'purchased is correct')


    //FAILURE: product must have a name
    await await  marketplace.createProduct('' , web3.utils.toWei('1','Ether') , {from:seller}).should.be.rejected;

    //FAILURE: product must have a price
    await await  marketplace.createProduct('iPhone' , '' , {from:seller}).should.be.rejected;

    })
    it ('lists products' , async () =>{

      const product = await marketplace.products(productCount);
      assert.equal(product.id.toNumber() , productCount.toNumber() , 'id is correct');
      assert .equal(product.name,'iPhone X' , 'name is correct')
      assert .equal(product.price, web3.utils.toWei('1', 'Ether') ,'price is correct')
      assert .equal(product.owner, seller , 'owner is correct')
      assert .equal(product.purchased, false , 'purchased is correct')

    })
    it ('sells products' , async () =>{

      //Track the seller balance before purchase
      let oldSellerBalance =  await web3.eth.getBalance(seller)
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      //SUCCESS
     result= await marketplace.purchaseProduct( productCount , { from : buyer , value: web3.utils.toWei('1' ,'Ether')})
      
     //check logs
     const event = result.logs[0].args
     assert.equal(event.id.toNumber() , productCount.toNumber() , 'id is correct');
     assert .equal(event.name,'iPhone X' , 'name is correct')
     assert .equal(event.price, web3.utils.toWei('1', 'Ether') ,'price is correct')
     assert .equal(event.owner, buyer , 'owner is correct')
     assert .equal(event.purchased, true , 'purchased is correct')

     //check whether the Seller received the funds
     let newSellerBalance =  await web3.eth.getBalance(seller)
     newSellerBalance = await web3.eth.getBalance(seller)
     newSellerBalance = new web3.utils.BN(newSellerBalance)

     let price = web3.utils.toWei('1' , 'Ether' )
     price = new web3.utils.BN(price)

    //  console.log(oldSellerBalance , newSellerBalance , price)
    const expectedBalance = oldSellerBalance.add(price)
    assert.equal(newSellerBalance.toString() , expectedBalance.toString() )


    //FAILURE : tries to buy a product with invalid id
    await marketplace.purchaseProduct( 101 , { from : buyer , value: web3.utils.toWei('1' ,'Ether')}).should.be.rejected;

    //FAILURE : tries to buy a product with insufficient ether
    await marketplace.purchaseProduct( productCount , { from : buyer , value: web3.utils.toWei('0.1' ,'Ether')}).should.be.rejected;

    //FAILURE : tries to buy a already purchased product
    await marketplace.purchaseProduct( productCount , { from : deployer , value: web3.utils.toWei('1' ,'Ether')}).should.be.rejected;

    //FAILURE : buyer cannot be the seller
    await marketplace.purchaseProduct( productCount , { from : seller , value: web3.utils.toWei('0.1' ,'Ether')}).should.be.rejected;


    })



  })
  
  

})