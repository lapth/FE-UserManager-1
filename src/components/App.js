import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Search from './Search';
import Tabledata from './Tabledata';
import AddUser from './AddUser';
import ButtonsSwap from './ButtonsSwap';
import {connect} from 'react-redux';
import * as APP_CONST from '../common/AppConst'
import dataPersistence from '../persistence/DataPersistence';
import DataFilter from '../common/DataFilter';

class App extends Component {

  componentWillMount() {
    dataPersistence.registerDataChange((appData) => {
      this.props.syncFirebaseStorage(
        appData,
        this.props.resultFilter)
    })
  }

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

const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    syncFirebaseStorage: (storedData, resultFilter) => {
      var newTmpData = DataFilter.getFilteredData(resultFilter, storedData)
      dispatch({
        type: APP_CONST.STORE_SYNC_LOCAL_STORAGE,
        data: storedData,
        tmpData: newTmpData
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
