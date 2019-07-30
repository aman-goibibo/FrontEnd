import React, { Component } from 'react';
import ReactSearchBox from 'react-search-box'
import { graphql, compose, Query } from 'react-apollo'
import StoryTemplate from './StoryTemplate'
import { getStoryQuery, getVideoQuery, getNewsQuery } from '../queries/query'
import ReactYoutubeCard from './ReactYoutubeCard'
import NewsCard from './NewsCard';

var state_value = 'Bangalore';

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

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Bangalore'
        }

        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    handleSearchChange = (e) => {
        this.setState({
            value: e.value
        })
        // console.log(this.props.getVideoQuery)
        // use the Mutations
        //  getVideoQuery({
        //     variables: {
        //         query: this.state.value
        //     },
        //     // refetchQueries: [{ query: getVideoQuery }]
        // });
        // this.props.getVideoQuery({
        //     variables: {
        //         query: 'aman',
        //         limit: 1,
        //     }
        // })
        // this.props.value = this.state.value;
       setTimeout(() => { state_value = this.state.value},1000)
    }

    displayStory() {
        var data = this.props.getStoryQuery;
        if (data.loading) {
            return (<div>Loading Stories . . .</div>)
        } else {
            return data.allStories.map(story => {
                return (
                    <div id="card--content" key={story.id}>
                        <StoryTemplate key={story.id} storyTitle={story.title} subStory={story.subStory} />
                    </div>
                )
            }
            )
        }
    }

    getVideos() {
        // console.log("I am called");
        // <Query query={getVideoQuery} variables={{ query: 'Delhi', limit: 2 }}>
        //     {({ data, loading, error }) => {
        //         console.log("I am in")
        //         console.log(data)

              

        //     }}
        // </Query>
        // console.log(this.props)
        var data = this.props.getVideoQuery;

        if (data.loading) {
            return (
                <div>Loading . . .</div>
            )
        } else {
            return data.VideoFeed.map(video => {
                return (
                    <ReactYoutubeCard videoId={video.videoId} key={video.videoId}/>
                )
            }
            )
        }
    }
    getNews() {
        var id = 0;
        var data = this.props.getNewsQuery;
        if (data.loading) {
            return (<div>Loading . . .</div>)
        } else {
            return data.NewsFeed.map(news => {
                id++;
                return (
                    <NewsCard src={news.urlToImage} link={news.url} title={news.title} description={news.description} author={news.author} key={id} />
                )
            }
            )
        }
    }



    render() {
        return (
            <div>
                <ReactSearchBox
                    placeholder="Discover Incredible Places"
                    value="Doe"
                    data={data}
                    inputBoxBorderColor="black"
                    onSelect={e => this.handleSearchChange(e)}
                />

                {/* STORY COMP */}
                <div className="heading-div">
                    <div className="hello">Trending Stories!</div>
                </div>
                <section id="card">
                    {this.displayStory()}
                </section>

                {/* Video Comp */}

                <div className="video-div">
                    <h2 className="dashed-shadow hello">Video Feed</h2>
                    <div className="video-div">
                        {this.getVideos()}

                    </div>


                </div>

                {/* News Comp */}
                <div>
                    <h2 className="dashed-shadow hello">News Feed</h2>
                    <div className="news-div">
                        {this.getNews()}

                    </div>

                </div>

            </div>


        );
    }
}

export default compose(
    graphql(getStoryQuery, { name: "getStoryQuery" }),
    graphql(getVideoQuery, {
        name: "getVideoQuery",
        options: (props) => {
            return {
                variables: {
                    query: 'Bangalore Travel Vlog',
                    limit: 2
                }
            }
        }
    }),
    graphql(getNewsQuery, {
        name: "getNewsQuery",
        options: (props) => {
            return {
                variables: {
                    query: 'Travel',
                    limit: 2
                }
            }
        }
    })
)(MainComponent)
