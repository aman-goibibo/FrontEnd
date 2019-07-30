import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Route } from 'react-router-dom'

//components
import DashBoard from './components/content-board/Dashboard'
import MainComponent from './components/MainComponent';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:2000/graphql',
})
class App extends Component {
  render() {
    return (
      <div className='box-field'>
        <ApolloProvider client={client}>
          <div className="">
            {/* <Route exact path="/" component={MainComponent} /> */}
            <Route exact path="/" render={()=><MainComponent  value="Bangalore"/>}/>

            <br />
          </div>
          <Route exact path="/dashboard" component={DashBoard} />
        </ApolloProvider>
      </div>
    );
  }
}
export default App;
