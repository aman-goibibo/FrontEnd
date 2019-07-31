import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Route } from 'react-router-dom'
import queryString from 'query-string'
import ReactSearchBox from 'react-search-box'
import Select from 'react-select';






//components
import DashBoard from './components/content-board/Dashboard'
import MainComponent from './components/MainComponent';
import SelectSearch from 'react-select-search'


//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:2000/graphql',
})



const data = [
  {
    key: 'bangalore',
    value: 'Bangalore',
  },
  {
    key: 'Goa',
    value: 'Goa',
  },
];

const scaryAnimals = [
  { label: "Alligators", value: 1 },
  { label: "Crocodiles", value: 2 },
  { label: "Sharks", value: 3 },
  { label: "Small crocodiles", value: 4 },
  { label: "Smallest crocodiles", value: 5 },
  { label: "Snakes", value: 6 },
];
const parsed = queryString.parse(location.search);
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      query: parsed.city,
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)


  }

  componentDidMount() {
    // console.log("State h " , this.state)
  }


  handleSearchChange = (e) => {
    // console.log("input change" , e.value)
    this.setState({
      query: e.value
    })

    var push_link = '/?city=' + e.value
    this.props.history.push(push_link);


  }
  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));

  render() {
    // console.log("APP", location.search);
    // const parsed = queryString.parse(location.search);
    // console.log("parsed", parsed.city)

    return (
      <div className='box-field'>
        <ApolloProvider client={client}>
          <div className="">
            <Route exact path="/dashboard" component={DashBoard} />

            {/* <Route exact path="/" component={MainComponent} city={parsed}/> */}

            {/* <Route exact path="/" render={(routeProps) => (<Select {...routeProps} options={scaryAnimals} />)} /> */}

            <Route exact path="/"
              render={(routeProps) => (<ReactSearchBox
                {...routeProps}
                placeholder="Discover Incredible Places"
                value="Doe"
                data={data}
                inputBoxBorderColor="black"
                onSelect={e => this.handleSearchChange(e)}
              />
              )} />
            <Route exact path="/"
              render={(routeProps) => (<MainComponent {...routeProps} city={this.state.query} />)} />

            {/* <Route  path={"/search?city=:city"} component={MainComponent}/> */}
            {/* <h1>{this.state.query}</h1> */}
            <br />
          </div>
        </ApolloProvider>
      </div>
    );
  }
}
export default App;
