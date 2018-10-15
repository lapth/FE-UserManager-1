import React, { Component } from 'react';
import * as APP_CONST from '../common/AppConst'
import { connect } from 'react-redux';
import DataFilter from '../common/DataFilter';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giaTriTimKiem: ""
        }
    }

    onTimKiem = (event) => {
        this.setState({
            giaTriTimKiem: event.target.value
        });
    }

    render() {
        return (
            <div className="col-12">
                <div className="form-group">
                    <div className="btn-group">
                        <input className="form-control" type="text" placeholder="Tìm kiếm"
                            onChange={(event) => this.onTimKiem(event)} />
                        <div className="btn btn-info" 
                            onClick={() => this.props.returnGiaTriTim(
                                this.state.giaTriTimKiem, 
                                this.props.data)}>Tìm</div>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        tmpData: state.tmpData,
        resultFilter: state.resultFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        returnGiaTriTim: (filteredValue, data) => {
            var filteredData = DataFilter.getFilteredData(filteredValue, data);
            dispatch({
                type: APP_CONST.STORE_UPDATE_SEARCH_FILTER,
                tmpData: filteredData,
                resultFilter: filteredValue
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)