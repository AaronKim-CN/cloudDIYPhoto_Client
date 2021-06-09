import React from 'react';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Tommenu from './components/Dashboard/Topmenu';
import Login from './components/Login/login';
import CreateAlbum from './components/Album/CreateAlbum';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useToken from './useToken';
import AlbumDetails from './components/Album/AlbumDetails';

import { Container } from '@material-ui/core';


function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Container maxWidth="lg">

      <BrowserRouter>
        <Tommenu />
        <Switch>
          <Route exact path="/">
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

    </Container>
  );
}

export default App;
