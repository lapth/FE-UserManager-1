import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Search from './Search';
import Tabledata from './Tabledata';
import AddUser from './AddUser';
import ButtonsSwap from './ButtonsSwap';
import MultiSelectListBox from './commons/MutilSelectListBox';

class App extends Component {

  render() {
    var datas = [
      {"itemName":"item1", "itemValue":"Item 1"},
      {"itemName":"item2", "itemValue":"Item 2"},
      {"itemName":"item3", "itemValue":"Item 3"},
      {"itemName":"item4", "itemValue":"Item 4"}];
    return (
      <MultiSelectListBox listDatas={datas}/>
      // <div>
      //   <Header />
      //   <div className="searchForm">
      //     <div className="container">
      //       <div className="row">
      //         <Search />
      //         <Tabledata data = {this.props.tmpData} quyens={this.props.quyens} />
      //         <div className="col-3">
      //           <ButtonsSwap />
      //           <AddUser />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default App
