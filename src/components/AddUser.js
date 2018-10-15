import React, { Component } from 'react';
import {connect} from 'react-redux';
import dataPersistence from '../persistence/DataPersistence';

class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoTen: "",
            tel: "",
            quyen: ""
        }
    }
    
    updateStateOnFormFieldChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name]: value
        });        
    }

    onBtnAddUserClick = () => {
        var newUser = {
            "hoTen": this.state.hoTen,
            "tel": this.state.tel,
            "quyen": this.state.quyen
        }

        dataPersistence.addUser(newUser);
    }

    hienThiForm = () => {
        if (this.props.trangThaiSua !== true) {
            return (
                <div className="card border-primary mb-3 mt-3">
                    <div className="card-header">Thêm Mới User</div>

                    <div className="card-body text-primary">
                        <div className="form-group">
                            <input name="hoTen" type="text" className="form-control" placeholder="Tên User" 
                                onChange={(event) => this.updateStateOnFormFieldChange(event)} />
                        </div>
                        <div className="form-group">
                            <input name="tel" type="text" className="form-control" placeholder="Điện Thoại" 
                                onChange={(event) => this.updateStateOnFormFieldChange(event)}/>
                        </div>
                        <div className="form-group">
                            <select name="quyen" className="custom-select" required
                                onChange={(event) => this.updateStateOnFormFieldChange(event)}>
                                {
                                    this.props.quyens.map((item, key) => {
                                        return <option value={key} key={key}>{item}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="btn btn-primary btn-block" onClick = {() => this.onBtnAddUserClick()}>Thêm Mới</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        return (
            this.hienThiForm()
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        tmpData: state.tmpData,
        trangThaiSua: state.trangThaiSua,
        resultFilter: state.resultFilter,
        quyens: state.quyens
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)