import React ,{Component} from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from '../src/abis/Marketplace.json'
import Navbar from './components/Navbar'

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
     let marketplace
     if(networkData)
     {
      const abi = Marketplace.abi
       marketplace = new  web3.eth.Contract(abi,networkData.address )
     }
     else {
      window.alert('Marketplace contract not deployed to the public network')
     }

     console.log(marketplace)

     
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
  }
  render( ) {
    return (
      <div className="App">
        <Navbar />
       <p>{this.state.account}</p>
      </div>
    );
  }
}

export default App;
