'use strict';

import React from 'react';
import Pokemon from './index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.onKeyUp.bind(this)}/>
        <Pokemon name={this.state.pokemon}/>
      </div>
    );
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.setState({
        pokemon: e.target.value
      });
    }
  }
}

App.PropTypes = {};
App.defaultProps = {};

export default App;