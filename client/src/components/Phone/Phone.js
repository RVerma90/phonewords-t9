import React, { Component } from 'react';
import Logo from '../../assets/logo.svg';
import './Phone.css';

import ACTIONS from "../../redux/action";
import { connect } from "react-redux";

class Phone extends Component {


  state = {
    wordSuggestions: [],
    suggestedWordsIndex: 0,
    numberString: '',
    realWordsOnly: true,
    textMessage: []
  }


  callApi = async () => {

    if (this.state.numberString === '') {
      return;
    }

    const requestBody = {
      numbers: this.state.numberString,
      realWordsOnly: this.state.realWordsOnly
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


  iterateOverSuggestions = () => {
    // Iterate over the suggested words
  
    let suggestedWordsIndex =  this.state.suggestedWordsIndex;
    let wordSuggestions = this.state.wordSuggestions;

    let i = suggestedWordsIndex < wordSuggestions.length ? suggestedWordsIndex += 1 : 0;
    this.setState({ suggestedWordsIndex: i });

    let word = this.state.wordSuggestions[i];
    this.setState({ word: word });

  }

  addWordToMessage = () => {
    // Select Word from the suggested words array after iteration
    let chosenWord = this.state.wordSuggestions[this.state.suggestedWordsIndex];
    let textMessage = this.state.textMessage;

    textMessage.push(chosenWord);

    this.setState({ 
      textMessage: textMessage, 
      numberString: '', 
      wordSuggestions: [], 
      suggestedWordsIndex: 0 }
    );

    this.props.selectWord(chosenWord);

  };
  

  clearAll = () => {
    // Resets state
    this.setState({ 
      textMessage: [], 
      numberString: '', 
      wordSuggestions: [], 
      suggestedWordsIndex: 0 
    });    
  }


  clearWord = () => {
    // Removes the keys for the 'current word' being typed
    this.setState({ 
      numberString: '', 
      wordSuggestions: [], 
      suggestedWordsIndex: 0 
    });    
  }


  toggleRealWordsOnly = () => {
    // Toggle between all words and real word suggestions
    this.setState((prevState) => {
      return { realWordsOnly: !prevState.realWordsOnly }
    }, () => {
      this.callApi();
    });
  }


  render() {

    return (
      <div className="phone-view">
        <div className="phone-main">

          <div className="instructions">
            <h1>Welcome the Phonewords T9, an old school phone simulator for predictive text message!</h1>
            <p>Key 1 is delete</p>
            <p>Keys 2-9 can be used to type a word</p>
            <p>Keys * and # can be used to iterate over the suggested words</p>
            <p>Key 0 is a space and adds the word to your message!</p>
          </div>

          <div className="checkbox">
            <label><input type="checkbox" name="checkbox" onClick={this.toggleRealWordsOnly} defaultChecked={this.state.realWordsOnly} />Real English Words for keys: {this.state.numberString}</label>
          </div>

          <div>
            <button onClick={this.clearAll}>Clear All</button>
            <button onClick={this.clearWord}>Clear Word</button>
          </div>

          <div className="mobile-phone">

            <img alt="logo" src={Logo} className="mobile-logo" />
            
            <div className="mobile-screen">
              {this.state.textMessage.map((text, index) => {
                return (
                  <span key={index}>{text} </span>
                )
              })} <span>{this.state.wordSuggestions[this.state.suggestedWordsIndex]}</span>
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
              <button className="buttons" onClick={() => this.iterateOverSuggestions()}>
                <div className="button-number">*</div>
                <div className="button-text">_</div>
              </button>
              <button className="buttons" onClick={() => this.addWordToMessage()}>
                <div className="button-number">0</div>
                <div className="button-text">[_]</div>
              </button>
              <button className="buttons" onClick={() => this.iterateOverSuggestions()}>
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


const mapStateToProps = state => ({
  textMessage: state.textMessage
});

const mapDispatchToProps = dispatch => ({
  selectWord: word => dispatch(ACTIONS.selectWord(word))
});

export default connect(mapStateToProps,mapDispatchToProps)(Phone);
