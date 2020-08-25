
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




  })
  
  

})