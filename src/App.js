import './App.css';
import './Login'
import Login from './Login';
import SignUp from './SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React, {Component} from 'react';


class App extends Component{
  state = {loading: true, loggedIn: false, users: {}}
  
  async componentDidMount(){
    let response = await fetch('/api/users');
    if(response.status === 200){
      this.setState({loggedIn: true});
      this.setState({users: await response.json()})
    }
    this.setState({loading :false});
  }

  render() {
    const {loading} = this.state;
    
    if (loading) {
      return <div> Loading... </div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hello World!
          </p>
        </header>
        <Router>
          <Switch>
            <Route exact path= "/">
              {this.state.loggedIn ? <p>{JSON.stringify(this.state.users)}</p> : <Redirect to="/login" />}
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;
