import React, { Component } from 'react';
import {connect} from 'react-redux';
import dataPersistence from '../persistence/DataPersistenceWithAxios';
import * as APP_CONST from '../common/AppConst'
import DataFilter from '../common/DataFilter';
import SpinButton from '../common/SpinButton';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            hoTen: this.props.rowData.hoTen,
            tel: this.props.rowData.tel,
            quyen: this.props.rowData.quyen,
            deleting: false,
            updating: false
        };
    }

    swapFormMode = () => {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    onFieldChanged = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    onEditDone = () => {
        //var modifiedUser = this.props.rowData;  // will edit the object in memory
        var modifiedUser = JSON.parse(JSON.stringify(this.props.rowData)); // copy object by JSON
        modifiedUser.hoTen = this.state.hoTen;
        modifiedUser.tel = this.state.tel;
        modifiedUser.quyen = this.state.quyen;
        
        this.setState({updating: true});
        dataPersistence.updateUser(modifiedUser, (updatedUser) => {
            this.setState({updating: false});
            this.swapFormMode();
            this.props.updateUser(updatedUser, this.props.data, this.props.resultFilter);
        });
    }

    onDelete = (userId) => {
        this.setState({deleting: true});
        dataPersistence.deleteUser(userId, (deleteUser) => {
            this.setState({deleting: false})
            this.props.deleteUser(userId, this.props.data, this.props.resultFilter);
        });
    }

    render() {
        if (this.state.editMode !== true) {
            return (
                <tr>
                    <td>{this.props.stt + 1}</td>
                    <td>{this.props.rowData.hoTen}</td>
                    <td>{this.props.rowData.tel}</td>
                    <td>{this.props.quyens[this.props.rowData.quyen]}</td>
                    <td>
                        <div className="btn-group">
                            <div className="btn btn-warning" onClick={() => this.swapFormMode()}><i className="fa fa-edit" /> Sửa</div>
                            <SpinButton 
                                className="btn btn-danger" 
                                onClick={() => this.onDelete(this.props.rowData._id)}
                                title="Xóa"
                                iconClassName="fa fa-trash"
                                loading={this.state.deleting}/>
                        </div>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>{this.props.stt + 1}</td>
                    <td>
                        <div className="form-group">
                            <input type="text" defaultValue={this.props.rowData.hoTen} name="hoTen"
                                onChange={(event) => this.onFieldChanged(event)} />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <input type="text" defaultValue={this.props.rowData.tel} name="tel"
                                onChange={(event) => this.onFieldChanged(event)} />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <select name="quyen" className="custom-select" required
                                defaultValue={this.props.rowData.quyen}
                                onChange={(event) => this.onFieldChanged(event)}>
                                {
                                    this.props.quyens.map((item, key) => {
                                        if (key > 0) {
                                            return <option value={key} key={key}>{item}</option>;
                                        }
                                    })
                                }
                            </select>
                        </div>
                    </td>
                    <td>
                        <div className="btn-group">
                            <SpinButton 
                                className="btn btn-warning" 
                                onClick={() => this.onEditDone()}
                                title="Done"
                                iconClassName="fa fa-check"
                                loading={this.state.updating}/>
                        </div>
                    </td>
                </tr>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        tmpData: state.tmpData,
        data: state.data,
        resultFilter: state.resultFilter,
        quyens: state.quyens
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (updatedUser, curData, resultFilter) => {
            curData.forEach(ele => {
                if (ele._id === updatedUser._id) {
                    ele.hoTen = updatedUser.hoTen;
                    ele.tel = updatedUser.tel;
                    ele.quyen = updatedUser.quyen;
                }
            })
            var newTmpData = DataFilter.getFilteredData(resultFilter, curData);
            dispatch({
                type: APP_CONST.STORE_ADD_USER,
                data: curData,
                tmpData: newTmpData
            });
        },

        deleteUser: (userId, curData, resultFilter) => {
            var newData = curData.filter(item => item._id !== userId);
            var newTmpData = DataFilter.getFilteredData(resultFilter, newData);
            dispatch({
                type: APP_CONST.STORE_ADD_USER,
                data: newData,
                tmpData: newTmpData
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow)