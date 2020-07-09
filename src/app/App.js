import {BrowserRouter, Router} from "react-router-dom";
import { createBrowserHistory } from 'history'
import Drawer from "./layout/Drawer";
import React, { Component } from 'react';
import fire from './config/fire';
import Login from './context/login/Login';

var hist = createBrowserHistory()

class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        user: {},
        statut: ""
      }
    }
  
    componentDidMount(){
      this.authListener();
    }
  
    authListener(){
      fire.auth().onAuthStateChanged((user) => {
        if(user) {
          this.setState({user})
        }
        else {
          this.setState({user: null})
        }
      })
    }
  
  
    render() {
        return (
          <div>
              <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Router history={hist}>
                {this.state.user ? (<Drawer user={this.state.user}/>) : (<Login/>)}
                </Router>
              </BrowserRouter>
          </div>
        );
      }
    }
    
    export default App;