import React, { Component } from 'react';
import TableRow from './TableRow';
import {connect} from 'react-redux';
import * as APP_CONST from '../common/AppConst'
import dataPersistence from '../persistence/DataPersistenceWithAxios';
import DataFilter from '../common/DataFilter';
import Loading from 'react-loading';

const mapStateToProps = (state) => {
    return { ...state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        initData: (storedData, resultFilter) => {
            var newTmpData = DataFilter.getFilteredData(resultFilter, storedData)
            dispatch({
                type: APP_CONST.STORE_SYNC_LOCAL_STORAGE,
                data: storedData,
                tmpData: newTmpData
            })
        }
    }
}

class Tabledata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    
    componentWillMount() {
        dataPersistence.getAllUser((datas) => {
            this.props.initData(
                datas,
                this.props.resultFilter);

            this.setState({loading: false});
        })
    }

    showLoading = () => {
        if (this.state.loading === true) {
            return (
                <tr>
                    <td>
                        <Loading type="spinningBubbles" color="#008000" height="50%" width="50%" />
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div className="col-9">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Điện Thoại</th>
                            <th>Quyền Hạn</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showLoading()}
                        {
                            this.props.data.map((value, key) => {
                                return <TableRow rowData={value} stt={key} key={key} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabledata);