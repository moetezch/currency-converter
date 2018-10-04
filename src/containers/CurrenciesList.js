import React, { Component } from 'react';
import currenciesListArray from '../utils/currenciesListArray'

class CurrenciesList extends Component {
  // default list of currencies
  state = { currencies: ["IDR", "EUR", "GBP", "SGD"] }
  // Adding another currency to the list
  onCurrencyAdd = event => {
    let value = event.target.value
    if (!this.state.currencies.includes(value)) {
      this.setState(() => ({ currencies: [...this.state.currencies, value] }));

    }
    event.target.value = "add"
  };
  // Showing the list of converted currencies 
  filterCurrencies(filtered, rates, amount, selectedCurrency) {
    return Object.entries(rates).map(([currency, rate]) => {
      return filtered.map((filteredcurrency) => {
        if (filteredcurrency === currency) {
          return (
            <div className="alert alert-light alert-dismissible fade show" role="alert" key={currency}>
              <p>{currency} {(rate * amount).toFixed(4)}</p>
              <p>{currency}-{(currenciesListArray.find((curr) => {
                return curr.includes(currency)
              }))[1]}
              </p>
              <p>1 {selectedCurrency} = {rate.toFixed(4)} {currency}</p>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => {
                const array = this.state.currencies
                array.splice(this.state.currencies.indexOf(currency), 1)
                this.setState(() => ({ currencies: array }));
              }}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

          )
        }
      })
    })
  }
  render() {
    const { rates, amount, selectedCurrency } = this.props
    return (
      <div>
        {this.filterCurrencies(this.state.currencies, rates, amount, selectedCurrency)}
        <div className="row">
          <div className="col">
            <select className="custom-select form-control" onChange={this.onCurrencyAdd}>
              <option value="add">Add another Currency</option>
              {currenciesListArray.map((currency) => {
                return (<option value={currency[0]} key={currency[0]}>{currency[0]}</option>)
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}


export default CurrenciesList;