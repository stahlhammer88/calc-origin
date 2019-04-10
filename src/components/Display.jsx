import React, { Component } from 'react';

class Display extends Component {    
    constructor(props) {
        super(props);
        this.valueSpan = React.createRef();        
        this.resultContainer = React.createRef();        
    }

    componentDidUpdate() {        
        const valueSpan = this.valueSpan.current;
        const resultContainer = this.resultContainer.current;                
        const maxFontSize = 72;
        const responsiveFontSize = Math.floor((resultContainer.offsetWidth + 150) / valueSpan.innerText.length);   
        valueSpan.style.fontSize = `${responsiveFontSize >= maxFontSize ? maxFontSize : responsiveFontSize}px`;                         
    }    
    
    render() {
        const {history, currentValue, prevValue} = this.props;
        const currentNumber = currentValue.length ? currentValue.join('') : '0';
        return (
            <div className="calculator__display">
                <div className="calculator__history">{history}</div>
                <div ref={this.resultContainer} className="calculator__result">
                    <span ref={this.valueSpan}>{prevValue || currentNumber}</span>
                </div>
            </div>
        );
    }
}

export default Display;