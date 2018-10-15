import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as APP_CONST from '../common/AppConst'

class ButtonsSwap extends Component {
    hienThiSua = () => {
        if (this.props.trangThaiSua === true) {
            return <div className="btn btn-outline-primary btn-block" 
                onClick={() => this.props.swapStatus(this.props.trangThaiSua)}>Thêm Mới</div>
        } else {
            return <div className="btn btn-outline-secondary btn-block" 
                onClick={() => this.props.swapStatus(this.props.trangThaiSua)}>Ẩn</div>
        }
    }

    render() {
        return (
            <div className="card border-primary">
                <div className="card-body">
                    {this.hienThiSua()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trangThaiSua: state.trangThaiSua
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        swapStatus: (curStatus) => {
            dispatch({
                type: APP_CONST.STORE_UPDATE_EDIT_STATE,
                trangThaiSua: !curStatus
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonsSwap)