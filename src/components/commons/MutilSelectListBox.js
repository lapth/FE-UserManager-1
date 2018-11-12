import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class CustomComponent extends Component {
    componentDidMount() {
        this.props.onHeightChange(300);
    }

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
        colection: []
    }

    constructor(props) {
        super(props);
        this.state = {
            lastSelectedItem: undefined,
            selectedItems: []
        }
    }

    addSelectedItemStyle(item) {
        item.classList.add(this.props.selectedStyle);
    }

    removeSelectedItemStyle(item) {
        item.classList.remove(this.props.selectedStyle);
    }

    onSelect(currentSelectedItemId) {
        if (this.props.multiSelect) {
            var selectedItems = [];
            if (this.state.selectedItems) {
                this.state.selectedItems.forEach((value, index) => {
                    if (value === true)
                        selectedItems.push(index);
                })
            }
            this.props.onSelect(selectedItems);
        } else {
            this.props.onSelect(currentSelectedItemId?[currentSelectedItemId]:[]);
        }
    }

    onClick(event) {
        
        var currentSelectedItem = event.target;
        // for the <li>.name ... we have to use getAttribute, except id
        var currentSelectedItemId = currentSelectedItem.id;
        var selectedItems_ = this.state.selectedItems;

        if (this.props.multiSelect) {
            // re-select to remove selection
            
            if (selectedItems_[currentSelectedItemId] === true) {
                this.removeSelectedItemStyle(currentSelectedItem);
                selectedItems_[currentSelectedItemId] = false;
            } else {
                this.addSelectedItemStyle(currentSelectedItem);
                selectedItems_[currentSelectedItemId] = true;
            }
        } else {
            var lastSelectedItemId = 
                this.state.lastSelectedItem ? this.state.lastSelectedItem.id : undefined;
            // remove selection
            if (currentSelectedItemId === lastSelectedItemId) {
                this.removeSelectedItemStyle(currentSelectedItem);
                this.setState ({
                    lastSelectedItem: undefined
                });
                currentSelectedItemId = undefined;
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

        this.onSelect(currentSelectedItemId);
    }

    onHeightChange(height) {
        console.log(height);
    }

    render() {
        if (typeof this.props.colection === 'undefined' || this.props.colection.length === 0) {
            console.log("List is empty!");
            return <div></div>;
        }

        var testItem = React.createElement(CustomComponent, {onHeightChange: this.onHeightChange});

        return (
            <ListGroup componentClass="ul">
                {this.props.colection.map((val, key) => {
                    return <CustomComponent key={key} id={key} 
                                onClick={(event) => this.onClick(event)}>
                                {val}
                            </CustomComponent>
                })}
            </ListGroup>
        );
    }
}

export default MultiSelectListBox;
