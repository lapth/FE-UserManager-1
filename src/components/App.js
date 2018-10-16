import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Search from './Search';
import Tabledata from './Tabledata';
import AddUser from './AddUser';
import ButtonsSwap from './ButtonsSwap';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <Search />
              <Tabledata data = {this.props.tmpData} quyens={this.props.quyens} />
              <div className="col-3">
                <ButtonsSwap />
                <AddUser />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
