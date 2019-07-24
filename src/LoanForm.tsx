import React from 'react';
import { MIN_DEPOSIT_AMOUNT } from './loanConstants';
import { ILoanTerms } from './loan.d';
import './styles/css/LoanForm.css';

interface ILoanFormProps {
    setTerms(terms: ILoanTerms): void, 
    setShowCars(showCars: number): void,
}

interface ILoanFormState {
    delivery: Date;
    price?: number;
    deposit?: number;
    loanTerm?: number;
    [key: string]: any;
}

export class LoanForm extends React.Component<ILoanFormProps, ILoanFormState> {

    constructor(props: ILoanFormProps) {
        super(props);
        this.state = {
            price: undefined,
            deposit: undefined,
            delivery: new Date(Date.now()),
            loanTerm: undefined,
        };
    }

    render(): JSX.Element {
        const loanTermValue = this.state.loanTerm;
        const deliveryDate = this.state.delivery.toISOString().slice(0, 10);
        let minDeposit = 0;
        const formPrice = this.state.price;
        const formDeposit = this.state.deposit;

        if (formPrice) {
            minDeposit = formPrice * MIN_DEPOSIT_AMOUNT
        }
        const depositError = (formDeposit && formDeposit < minDeposit) 
            ? `Deposit must be greater than ${minDeposit}.`
            : null;

        return (
            <div className="card-container">
                <form className="loanform-flex-container" onSubmit={this._handleSubmit}>
                    <div className="loanform-flex-item">
                    <label>Vechicle Price:
                        <input type="number" name="price" onChange={this._handleNumber} />
                    </label>
                    <label>
                        Deposit:
                        <input type="number" name="deposit" min={minDeposit} onChange={this._handleNumber} />
                        {depositError}
                    </label>
                    <label> 
                        Delivery Date:
                        <input type="date" name="delivery" value={deliveryDate} onChange={this._handleDate} />
                    </label>
                    </div>
                    <div className="loanform-flex-item">
                        Finance Options:
                        <label>
                            <input 
                                type="radio" 
                                name="loanTerm" 
                                id="loanForm-loanTerm-radio1" 
                                value="1"
                                checked={loanTermValue === 1}
                                onChange={this._handleRadio}
                            />
                            1 yr
                        </label>
                        <label>                       
                            <input 
                                type="radio" 
                                name="loanTerm" 
                                id="loanForm-loanTerm-radio2" 
                                value="2"
                                checked={loanTermValue === 2}
                                onChange={this._handleRadio}
                            />
                            2 yrs
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="loanTerm" 
                                id="loanForm-loanTerm-radio3" 
                                value="3"
                                checked={loanTermValue === 3}
                                onChange={this._handleRadio}
                            />
                            3 yrs
                        </label>
                        <div>
                            <input type="submit" value="Show Payments" />
                            <button onClick={this._handleShowCars}>Show Cars</button>
                            <button type="reset" onClick={this._clearForm}>Clear Form</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    _handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = parseInt(e.target.value);

        this.setState({[name]: value});
    }

    _handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(Date.parse(e.target.value));

        this.setState({delivery: date});
    }

    _handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);

        this.setState({loanTerm: value});
    }

    _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loanAmount = this.state.price;
        const deposit = this.state.deposit;
        const loanTerm = this.state.loanTerm;
        const loanInception = this.state.delivery;
        
        if (loanAmount && deposit && loanTerm) {
            const terms: ILoanTerms = {
                loanAmount,
                deposit,
                loanTerm,
                loanInception,
            };
            this.props.setTerms(terms);
        }
    }
    _handleShowCars = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const loanAmount = this.state.price;
        const deposit = this.state.deposit;
        const loanTerm = this.state.loanTerm;
        
        if (loanAmount && deposit && loanTerm) {
            const maxPayment = loanAmount / (loanTerm * 12);
            this.props.setShowCars(maxPayment);
        }
    }
    
    _clearForm = () => {
        this.setState({
            price: undefined,
            deposit: undefined,
            delivery: new Date(Date.now()),
            loanTerm: undefined,
        })
    }
}
