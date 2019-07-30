import { gql } from 'apollo-boost';

const addStoryQuery2 = gql`
{
  allStories{
    title
    id
  }
}
`


const getStoryQuery = gql`
{
  allStories{
    title
    id
    subStory{
      url,
      description,
      title
    }
  }
}
`
const getVideoQuery = gql`
query GetVideo($query : String!,$limit:Int!){
    VideoFeed(query: $query , limit : $limit){
      videoId
      title
      url
    }
}
`
const getNewsQuery = gql`
query GetNews($query : String! , $limit : Int!){
        NewsFeed(query:$query , limit : $limit){
          description
          content
          title
          author
          url
          urlToImage
        }
      
}
`
const addStoryQuery = gql`
mutation($title: String! , $description: String!,$tags: String!,$subStory:[CreateUserInput]!){
  addStory(title: $title,description: $description,tags:$tags,subStory: $subStory){
    title
  }
}
`


export {
  addStoryQuery,
  addStoryQuery2,
  getStoryQuery,
  getVideoQuery,
  getNewsQuery
}