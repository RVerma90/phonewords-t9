import React, { Component } from 'react';

import Phone from './components/Phone/Phone';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from './redux/store';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <Phone />
      </ReduxProvider>
    );
  }
}

export default App;
