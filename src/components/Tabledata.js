import React, { Component } from 'react';
import TableRow from './TableRow';

class Tabledata extends Component {

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

export default Tabledata;