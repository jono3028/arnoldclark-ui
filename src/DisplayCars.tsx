import React from 'react';
import { CAR_SEARCH_URL } from './loanConstants';
import { ICarSearchRes } from './loan';

interface IDisplayCarsProps {
  payment: number,
}

interface IDisplayCarsState {
  isLoading: boolean,
  cars?: ICarSearchRes[]
  error?: string
}

export class DisplayCars extends React.Component<IDisplayCarsProps, IDisplayCarsState>{

  constructor(props: IDisplayCarsProps) {
    super(props)
    this.state = ({
      isLoading: true,
    })
  }

  render(){
    const cars = this.state.cars;

    if (this.state.isLoading || !cars) {
      return null;
    }

    const renderedCars = cars.map((car) => {
      return (
        <div>
          {car.make} / {car.model} / &pound;{car.salesInfo.pricing.cashPrice}
        </div>
      )
    })

    return (
      <div className="card-container">
        {renderedCars}
      </div>
    )
  }

  componentDidMount() {
    this._getCars();
  }

  _getCars() {

    const payment = this.props.payment;
    const queryParams: {[key: string]: any} = {
      payment_types: 'monthly',
      min_price: payment - 50,
      max_price: payment,
    }

    const fetchOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
  
    const queryString = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');;
    fetch(CAR_SEARCH_URL + queryString, fetchOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoading: false,
            cars: result.searchResults.slice(0,6)
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error
          });
        }
      )
  }
}