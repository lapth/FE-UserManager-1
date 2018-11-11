import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class CustomComponent extends Component {
    render() {
        return (
            <li
                className="list-group-item list-group-item-action"
                {...this.props}
            >
                {this.props.children}
            </li>
        );
    }
};

class MultiSelectListBox extends Component {
    static defaultProps = {
        selectedStyle: 'list-group-item-success',
        multiSelect: false,
        searchable: false,
        listDatas: []
    }

    constructor(props) {
        super(props);
        this.state = {
            lastSelectedItem: null,
            selectedItems: []
        }
    }

    addSelectedItemStyle(item) {
        item.classList.add(this.props.selectedStyle);
    }

    removeSelectedItemStyle(item) {
        item.classList.remove(this.props.selectedStyle);
    }

    onClick(event) {
        
        var currentSelectedItem = event.target;
        // for the li ... we have to use getAttribute
        var currentSelectedItemName = currentSelectedItem.getAttribute('name');
        var selectedItems_ = this.state.selectedItems;

        if (this.props.multiSelect) {
            // re-select to remove selection
            
            if (selectedItems_[currentSelectedItemName] === true) {
                this.removeSelectedItemStyle(currentSelectedItem);
                selectedItems_[currentSelectedItemName] = false;
            } else {
                this.addSelectedItemStyle(currentSelectedItem);
                selectedItems_[currentSelectedItemName] = true;
            }
        } else {
            var lastSelectedItemName = 
                this.state.lastSelectedItem ? this.state.lastSelectedItem.getAttribute('name') : '';
            // remove selection
            if (currentSelectedItemName === lastSelectedItemName) {
                this.removeSelectedItemStyle(currentSelectedItem);
                this.setState ({
                    lastSelectedItem: null
                });
            } else {
                if (this.state.lastSelectedItem) {
                    this.removeSelectedItemStyle(this.state.lastSelectedItem);
                }
                this.addSelectedItemStyle(currentSelectedItem);
                this.setState ({
                    lastSelectedItem: currentSelectedItem
                });
            }
        }
    }

    render() {
        if (typeof this.props.listDatas === 'undefined' || this.props.listDatas.length === 0) {
            console.log("List is empty!");
            return <div></div>;
        }
        return (
            <ListGroup componentClass="ul">
                {this.props.listDatas.map((val, key) => {
                    return <CustomComponent key={key} name={val.itemName} 
                                onClick={(event) => this.onClick(event)}>
                                {val.itemValue}
                            </CustomComponent>
                })}
            </ListGroup>
        );
    }
}

export default MultiSelectListBox;
