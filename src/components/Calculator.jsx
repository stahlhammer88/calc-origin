import React, { Component } from 'react';
import Display from './Display';
import Button from './Button';
import { symbols } from '../utils/symbols';
import safeEval from 'safe-eval';

class Calculator extends Component {

    initialState = {        
        history: '',        
        currentValue: [],
        prevValue: '',        
    }

    state = {...this.initialState};

    componentDidMount() {
        document.addEventListener('keyup', e => this.handleInput({}, e));
    }    

    isNumPadKey = keyCode => (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);

    isOperatorKey = keyCode => keyCode === 111 || keyCode === 106 || keyCode === 107 || keyCode === 109;

    handleInput = ({symbol, type}, {keyCode, key}) => {                        
        let {currentValue, history, prevValue, result} = this.state;
        const currentNumber = currentValue.join('');

        if ( (type === 'number' || this.isNumPadKey(keyCode)) && currentValue.length <= 16 ) {
            const currentNumber = parseInt(symbol || key);
            if (currentNumber || currentNumber === 0) {
                const newCurrentValue = [...currentValue, currentNumber];
                this.setState({
                    currentValue: newCurrentValue,
                    prevValue: '',                    
                })
            }
        }
        else if (type === 'clear' || keyCode === 27) {            
            this.setState({...this.initialState});
        }
        else if (type === 'operator' || this.isOperatorKey(keyCode)) {
            if (currentValue.length || result || history) {
                prevValue && (history = history.slice(0, -2)); 
                history += ` ${currentNumber} ${symbol || key.replace(/[*//]/g, m=>m==='*'?'×':'÷')}`;
                this.setState({
                    history: history,
                    currentValue: [],
                    prevValue: currentNumber
                });
            }                      
        }
        else if (type === 'result' || keyCode === 13) {
            if (currentValue.length && history) {                              
                const result = safeEval(history.replace(/[×÷]/g, m=>m==='×'?'*':'/') + currentNumber).toString();
                
                this.setState({
                    history: '',
                    currentValue: [...result],
                })
            }            
        }
        else if (type === 'backspace' || keyCode === 8) {
            if (currentValue.length) {
                const newCurrentNumber = [...currentValue];
                newCurrentNumber.splice(-1, 1);
                this.setState({
                    currentValue: newCurrentNumber
                });
            }
        }
        else if (type === 'point' || keyCode === 110 || keyCode === 190) {
            if (currentValue.length && !currentValue.includes('.')) {
                const newCurrentNumber = [...currentValue, '.'];
                this.setState({
                    currentValue: newCurrentNumber
                });
            }
        }
        else if (type === 'sign') {
            if (currentValue.length && currentNumber !== '0') {
                const newCurrentNumber = currentNumber * -1;
                this.setState({
                    currentValue: [...newCurrentNumber.toString()]
                });
            }
        }
        else if (type === 'percent') {
            const firstOperand = parseInt(history.split(' ')[1]);
            const secondOperand = parseInt(currentNumber);
            if (firstOperand && secondOperand) {
                const percentage = (firstOperand / 100) * secondOperand
                this.setState({
                    currentValue: [...percentage.toString()]
                })
            }            
        }
    }

    renderButtons = () => (
        symbols.map((buttonSymbol, i) => {
            return(
                <Button key={i} buttonSymbol={{...buttonSymbol}} handleClick={this.handleInput}/>
            )
        })
    )

    render() {
        return (
            <div className="calculator">
                <Display {...this.state}/>
                <div className="calculator__pad">
                    {this.renderButtons()}
                </div>                
            </div>
        );
    }
}

export default Calculator;