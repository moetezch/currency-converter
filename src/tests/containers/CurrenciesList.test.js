import {shallow} from 'enzyme'
import React from 'react'
import CurrenciesList from '../../containers/CurrenciesList'

it('expect to render currencies list',()=>{
const mockselectedCurrency="USD"
const mockRates={
  "CAD": 1.565,
  "CHF": 1.1798,
}
const mockAmount=20
  const wrapper = shallow(<CurrenciesList rates={mockRates} amount={mockAmount} selectedCurrency={mockselectedCurrency}/>)
  expect (wrapper).toMatchSnapshot()
})