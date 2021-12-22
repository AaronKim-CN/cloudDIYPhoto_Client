import React from 'react';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Tommenu from './components/Dashboard/Topmenu';
import Login from './components/Login/login';
import CreateAlbum from './components/Album/CreateAlbum';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useToken from './useToken';
import AlbumDetails from './components/Album/AlbumDetails';

//MUI5.0
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    secondary: {
      main: brown[500],
    },
  },
  typography: {
    fontFamily: '-apple-system',
  }
})

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    
    <ThemeProvider theme={theme}>

      <Container maxWidth="lg">
        <BrowserRouter>
          <Tommenu />
          <Switch>
            <Route exact path="/">
              <Dashboard token={token} />
            </Route>
            <Route exact path="/createalbum">
              <CreateAlbum token={token} />
            </Route>
            <Route exact path="/albumdetails">
              <AlbumDetails token={token} />
            </Route>
          </Switch>
        </BrowserRouter>
      </Container>

    </ThemeProvider>
    
  );
}

export default App;
