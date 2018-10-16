import React, { Component } from 'react';

class SpinButton extends Component {
    renderTitle = () => {
        if (this.props.loading === true) {
            return (
                <span className="form-group">
                    <i className="fa fa-spinner fa-spin" />
                    &nbsp;&nbsp;
                    {this.props.title}
                </span>
            )              
        } else {
            if (this.props.iconClassName !== undefined) {
                return (
                    <span className="form-group">
                        <i className={this.props.iconClassName} />
                        &nbsp;&nbsp;
                        {this.props.title}
                    </span>
                )
            } else {
                return this.props.title;
            }
        }
    }

    render() {
        var classN = this.props.className;
        if (this.props.loading) {
            classN = classN + " disabled";
        }
        if (this.props.loading) {
            return <div className={classN}>{this.renderTitle()}</div>
        } else {
            return (
                <div className={classN} 
                    onClick = {this.props.onClick}>{this.renderTitle()}
                </div>
            );
        }
    }
}

export default SpinButton;