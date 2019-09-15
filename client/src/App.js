import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  state = {
    wordSuggestions: [],
    numberString: ''
  }

  callApi = async () => {

    if (this.state.numberString === '') {
      return;
    }

    const requestBody = {
      numbers: this.state.numberString
    }

    const response = await fetch("/suggestions", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    
    this.setState({
      wordSuggestions: body
    })

    if (response.status !== 200) throw Error(body.message);
    return body;
  };


  keyPressed = (key) => {
    // If '1' is pressed, remove the previous key to delete key
    if (key === 'del') {
      this.setState((prevState) => {
        return { numberString: prevState.numberString.slice(0, -1), wordSuggestions: []}
      });
      key = '';
    }

    // Otherwise, add key number to numberString state and callApi() to retrieve suggestions
    this.setState((prevState) => {
      return {numberString: prevState.numberString + key};
    }, () => {
      this.callApi();
    })
    
  }


  render() {

    return (
      <div className="App">
        <div className="App-main">
          <div className="mobile-phone">

            <img src={logo} className="mobile-logo" />
            
            <div className="mobile-screen">

            </div>

            <div className="buttons-row">
              <button className="buttons" onClick={() => this.keyPressed('del')}>
                <div className="button-number">1</div>
                <div className="button-text">del</div>
              </button>
              <button className="buttons" onClick={() => this.keyPressed('2')}>
                <div className="button-number">2</div>
                <div className="button-text">a b c</div>
              </button>
              <button className="buttons" onClick={() => this.keyPressed('3')}>
                <div className="button-number">3</div>
                <div className="button-text">d e f</div>
              </button>                            
            </div>

            <div className="buttons-row">
              <button className="buttons" onClick={() => this.keyPressed('4')}>
                <div className="button-number">4</div>
                <div className="button-text">g h i</div>
              </button>
              <button className="buttons" onClick={() => this.keyPressed('5')}>
                <div className="button-number">5</div>
                <div className="button-text">j k l</div>
              </button>
              <button className="buttons" onClick={() => this.keyPressed('6')}>
                <div className="button-number">6</div>
                <div className="button-text">m n o</div>
              </button>                            
            </div>

            <div className="buttons-row">
              <button className="buttons" onClick={() => this.keyPressed('7')}>
                <div className="button-number">7</div>
                <div className="button-text">p q r s</div>
              </button>
              <button className="buttons" onClick={() => this.keyPressed('8')}>
                <div className="button-number">8</div>
                <div className="button-text">t u v</div>
              </button>
              <button className="buttons" onClick={() => this.keyPressed('9')}>
                <div className="button-number">9</div>
                <div className="button-text">w x y z</div>
              </button>                            
            </div>

            <div className="buttons-row">
              <button className="buttons" onClick={() => this.keyPressed('')}>
                <div className="button-number">*</div>
                <div className="button-text">_</div>
              </button>
              <button className="buttons" onClick={() => this.keyPressed('')}>
                <div className="button-number">0</div>
                <div className="button-text">[_]</div>
              </button>
              <button className="buttons" onClick={() => this.keyPressed('')}>
                <div className="button-number">#</div>
                <div className="button-text">_</div>
              </button>                            
            </div>            

          </div>

          <div className="suggestion-box">
            {this.state.wordSuggestions.map((suggestion, index) => {
              return (
                <span key={index}>{suggestion} </span>
              )
            })}
          </div>

        </div>
      </div>
    );

  }


}

export default App;
