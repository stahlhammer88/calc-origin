import React from 'react';

const Button = ({buttonSymbol, handleClick}) => {    
    const {symbol} = buttonSymbol;   
    return (
        <div 
            onClick={() => handleClick(buttonSymbol, {})} 
            className={`calculator__button ${symbol === '<' ? 'calculator__button--backspace' : '' }`}>
            {symbol}
        </div>
    );
};

export default Button;