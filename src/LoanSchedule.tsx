import React from 'react';
import './styles/css/LoanSchedule.css';
import { IPaymentSchedule } from './loan';

interface ILoanScheduleProps {
  schedule: IPaymentSchedule[],
}

export class LoanSchedule extends React.PureComponent<ILoanScheduleProps> {

  render() {
    const payments = this.props.schedule;
    const renderedPayments = payments.map(payment => {
      const note = payment.note ? (<td>{payment.note}</td>): null;
      const item = 
        <tr key={payment.dueDate}> 
          <td>{payment.dueDate}</td>
          <td>&pound;{payment.ammount.toFixed(2)}</td>
          {note}
        </tr>
      
      return item;
    })

    return (
      <div className="card-container">
        <table>
          <thead>
            <tr key="loanschedule-header">
              <th>Payment Due</th>
              <th>Amount Due</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
          {renderedPayments}
          </tbody>
        </table>
      </div>
    );
  }
}
