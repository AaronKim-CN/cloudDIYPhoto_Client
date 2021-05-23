import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

import { Link } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/login';
import CreateAlbum from './components/Album/CreateAlbum';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useToken from './useToken';
import AlbumDetails from './components/Album/AlbumDetails';

import Button from '@material-ui/core/Button';


function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {/* <Link to={`/createalbum`}>
              <Button variant="contained" color="primary">Create Album</Button>
            </Link> */}
            <Button variant="contained" color="primary" component={Link} to="/createalbum">Create</Button>
            <Dashboard />
          </Route>
          <Route exact path="/createalbum">
            <CreateAlbum />
          </Route>
          <Route exact path="/albumdetails">
            <AlbumDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
