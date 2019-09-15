import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {


  state = {
    response: ""
  }


  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }


  callApi = async () => {
    const response = await fetch("/suggestions", {
      method: "POST",
      body: JSON.stringify({ numbers: 63582}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    console.log(body);
    
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.response}
          </p>
        </header>
      </div>
    );
  }


}

export default App;
