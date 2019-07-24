import React from 'react';
import './styles/css/App.css';
import { ILoanTerms, IPaymentSchedule } from './loan.d';
import { getLoanSchedule } from './utilities';

import { LoanForm } from './LoanForm';
import { LoanSchedule } from './LoanSchedule';
import { DisplayCars } from './DisplayCars';

interface IAppProps {}

interface IAppState {
  paymentSchedule?: IPaymentSchedule[],
  showCars?: number,
}

export class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props)
    this.state = {
      paymentSchedule: undefined,
    }
  }

  render() {
    let loanSchedule = null; 
    let showCars = null;
    const schedule = this.state.paymentSchedule;
    if (schedule) {
      loanSchedule = <LoanSchedule schedule={schedule} />;
      if (this.state.showCars) {
        showCars = <DisplayCars payment={this.state.showCars} />
      }
    }
    
    return (
      <div className="App">
          <LoanForm setTerms={this._setLoanSchedule} setShowCars={this._setShowCars} />
          {loanSchedule}
          {showCars}
      </div>
    );
  }

  _setLoanSchedule = (terms: ILoanTerms) => {
    const paymentSchedule = getLoanSchedule(terms);

    this.setState({paymentSchedule})
  }

  _setShowCars = (showCars: number) => {
    this.setState({showCars});
  }
}
