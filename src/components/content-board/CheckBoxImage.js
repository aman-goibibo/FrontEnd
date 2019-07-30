import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { addStoryQuery } from '../../queries/query'
import './CheckBoxImage.css'


class CheckBoxImage extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            title: '',
            description: '',
            tag: '',
            selected_urls: []
        }
    }


    handleClick(link, tag) {
        this.state.selected_urls.push({ url: link })
        this.setState({
            tag
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.addStoryQuery({
            variables: {
                title: this.state.title,
                description: this.state.description,
                tags: this.state.tag,
                subStory: this.state.selected_urls
            }
        })
        alert("Submitted")

    }



    display() {
        var i = 0;
        var id_var = '';
        return this.props.urls.map(url => {
            i += 1;
            id_var = 'cb' + i;
            return (
                <li><input type="checkbox" id={id_var} />
                    <label for={id_var}><img src={url.url} onClick={() => this.handleClick(url.url, url.tag)} alt='' /></label>
                </li>
            )
        })
    }

    render() {

        return (
            <div>
                <ul>
                    {this.display()}
                </ul>
                <br /><br />
                <form className="heading">
                    <h4>Enter the details of the story</h4>
                    <input
                        name='title'
                        value={this.state.title}
                        placeholder='Enter Title'
                        onChange={e => this.handleChange(e)} />
                    <br /><br />
                    <input
                        name='description'
                        value={this.state.description}
                        placeholder='Enter Description'
                        onChange={e => this.handleChange(e)} />
                </form>
                <button className="heading" onClick={(e) => { this.onSubmit(e) }}>CREATE STORY</button>
            </div>
        );
    }
}

export default compose(
    graphql(addStoryQuery, { name: "addStoryQuery" })
)(CheckBoxImage);