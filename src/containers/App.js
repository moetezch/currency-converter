import React, { Component } from 'react'
import CurrenciesList from '../containers/CurrenciesList'
import img from '../images/icon.png'
import currenciesListArray from '../utils/currenciesListArray'

export default class App extends Component {
  state = { rates: {}, amount: 1, selectedCurrency: 'USD' }
  componentDidMount() {
    this.getRates(this.state.selectedCurrency)
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    this.setState(() => ({ amount }));
  };
  onCurrencyChange = event => {
    const value = event.target.value
    this.getRates(event.target.value)
    this.setState(() => ({ selectedCurrency:value }));
  };
getRates(selectedCurrency) {
    fetch(`https://api.exchangeratesapi.io/latest?base=${selectedCurrency}`)
      .then(response => response.json())
      .then(rates => { this.setState({ rates: rates.rates }) });
  }
  render() {

    const { rates, amount } = this.state
    return (
        <div className="container app">
        <img src={img} alt="currency converter" />
        <h2>Currency Converter | Foreign Exchange Rates</h2>
          <div className="row">
            <div className="col-md-6 form-group">
              <select className="custom-select form-control" onChange={this.onCurrencyChange}>
              {currenciesListArray.map((currency)=>{
                return (<option value={currency[0]} key={currency[0]}>{currency[0]}</option>)
              })}
              </select>
            </div>
            <div className="col-md-6 form-group">
              <input type="number" min="1" onChange={this.onAmountChange} className="form-control" placeholder="Amount" />
            </div>
            <div className="col-md-12">
            <CurrenciesList rates={rates} amount={amount} selectedCurrency={this.state.selectedCurrency}/>
            </div>
          </div>
        </div>
      
    );
  }
}