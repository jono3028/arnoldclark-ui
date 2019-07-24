
import { ARRANGEMENT_FEE, COMPLETION_FEE } from './loanConstants';
import { ILoanTerms, IPaymentSchedule } from './loan.d';

export function getLoanSchedule(terms: ILoanTerms): IPaymentSchedule[] {
  const paymentArray: IPaymentSchedule[] = [];
  const termMonths = terms.loanTerm * 12;
  const payment = (terms.loanAmount - terms.deposit) / termMonths;

  let year = terms.loanInception.getFullYear();
  let month = terms.loanInception.getMonth();
  month++; // Date object months are zero indexed 

  for (let x = 0; x < termMonths; x++){
    if (month === 12) {
      year++;
      month = 1;
    } else {
      month++;
    }
    const dueDate = `1/${month}/${year}`;

    if (x !== 0 && x !== (termMonths - 1)) {
      paymentArray.push({
        dueDate,
        ammount: payment,
      })
    } else {
      const fee = (x === 0) 
        ? ARRANGEMENT_FEE
        : COMPLETION_FEE;
      const note = (x === 0)
        ? 'Includes arrangement fee'
        : 'Includes completion fee';
      paymentArray.push({
        dueDate,
        note,
        ammount: (payment + fee)
      })
    }
  }
  
  return paymentArray;
}