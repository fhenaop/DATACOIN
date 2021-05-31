import React, { Component } from 'react';
import DataCoin from '../abis/DataCoin.json'
import Web3 from 'web3';

class Transfer extends Component {

  async UNSAFE_componentWillMount() {
    await this.loadWeb3()
    await this.loadDataCoin()
  }

  state = {
    amount: "",
    recipient: "",
    errorMessage: "There was an error.",
    successMessage: "The transfer has been successful",
    loading: false
  };

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
  async loadDataCoin() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DataCoin.networks[networkId]
    if(networkData) {
      // Assign contract
      const datacoin = new web3.eth.Contract(DataCoin.abi, networkData.address)
      this.setState({ datacoin })
      const balance = await datacoin.methods.balanceOf({ account: accounts[0]}.account).call()
      this.setState({ balance })
    } else {
      window.alert('DataCoin contract not deployed to detected network.')
    }
  }
  onSubmit = async event => {
    event.preventDefault();
    const web3 = window.web3
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await this.state.datacoin.methods
        .transfer(this.state.recipient, this.state.amount)
        .send({
          from: accounts[0]
        });
      this.setState({
        loading: false,
        successMessage: this.state.successMessage
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
    }
  };
  render() {
    return (
      <>
      
      <p>&nbsp;</p>
      <div>
        <h2 style={{'text-align': 'center'}}>Your balance: {this.props.balance} DCN</h2>
      </div>
      <div className="card text-white mx-auto bg-dark mb-3" style={{ maxWidth: '30rem' }}>
                <div className="card-header">Transfer DataCoins</div>
                <div className="card-body">

                  <form onSubmit={this.onSubmit} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="transferAmount"
                            type="text"
                            className="form-control text-monospace"
                            placeholder="Write the amount in DataCoins."
                            value={this.state.amount}                            
                            onChange={event =>
                              this.setState({ amount: event.target.value })
                            }
                            required 
                            />
                        <br></br>
                          <input
                            id="transferAddress"
                            type="text"
                            className="form-control text-monospace"
                            placeholder="Write the address."
                            value={this.state.recipient}
                            onChange={event =>
                              this.setState({ recipient: event.target.value })
                            }
                            required />
                      </div>

                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary" ><b>Transfer!</b></button>
                      </div>
                  </form>
                </div>
              </div>
              <p>&nbsp;</p>
              <div style = {{'height':'21vh'}}></div>
      </>
    );
  }
}

export default Transfer;
