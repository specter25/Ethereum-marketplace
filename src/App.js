import React ,{Component} from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from '../src/abis/Marketplace.json'
import Navbar from './components/Navbar'
import Main from './components/Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3=window.web3 ;
    //load accounts
     const accounts = await web3.eth.getAccounts()
     console.log(accounts[0])
     this.setState({account:accounts[0]}) 
     
     const networkId = await web3.eth.net.getId() 
     const networkData = Marketplace.networks[networkId]

     if(networkData)
     {
      const abi = Marketplace.abi
      const marketplace = new  web3.eth.Contract(abi,networkData.address )
      const productCount = await marketplace.methods.productCount().call()

     console.log(productCount.toString())
     this.setState({marketplace})
     this.setState({loading:false})
     }
     else {
      window.alert('Marketplace contract not deployed to the public network')
     }


     
  }

  async createProduct(name , price) {
    this.setState({loading: true})
    this.state.marketplace.methods.createProduct(name, price).send({from : this.state.account})
    .once('receipt ' , (receipt) =>{
      this.setState({loading:false})
    })
  }

  constructor(props)
  {
    super(props)
    this.state ={
      account:'',
      productCount:0,
      products:[],
      loading:true
    }
    this.createProduct= this.createProduct.bind(this)
  }
  render( ) {
    return (
      <div className="App">
        <Navbar address={this.state.account} />
        <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  createProduct={this.createProduct}
                   />
              }
            </main>
       <p></p>
      </div>
    );
  }
}

export default App;
