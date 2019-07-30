import React, { Component } from 'react';
import ReactSearchBox from 'react-search-box'

const data = [
    {
        key: 'bangalore',
        value: 'Bangalore',
    },
    {
        key: 'Delhi',
        value: 'Delhi',
    },
];

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }


    handleChange = (e) => {
        this.setState({
            value: e.value
        })
        // setTimeout(() => { console.log(this.state.value) })
        //    this.props.function(this.state.value)
        this.props.function(this.state.value)
    }



    render() {
        console.log(this.props)


        return (
            <div>
                <ReactSearchBox
                    name='value'
                    placeholder="Discover Incredible Places"
                    // onSelect={this.handleSelect}
                    value="Doe"
                    data={data}
                    callback={record => console.log(record)}
                    inputBoxBorderColor="black"
                    onSelect={e => this.handleChange(e)}
                />
            </div>

        );
    }

}

export default SearchBar;
