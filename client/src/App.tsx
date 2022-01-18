import React, { useEffect } from 'react';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Navbar from './containers/Navbar';

import * as routes from './routes';
import { Switch, Route, useHistory } from 'react-router-dom';

import SnackBar from './components/snackbar/SnackBar';
import Login from './pages/Login';
import Register from './pages/Register';

import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './redux/actions/auth/actions';
import { IStore } from './types';

import PrivateRoute from './components/private-route';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { currentUser, isLoading } = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    dispatch(getProfile(history));
  }, []);

  return (
    <>
      <div className="App">
        <Navbar />
        {!isLoading ? (
          <Switch>
            <Route exact path={routes.HOME} component={Home} />
            <Route path={routes.LOGIN} component={Login} />
            <Route path={routes.REGISTER} component={Register} />

            <PrivateRoute
              isLoggedIn={!!currentUser}
              path={routes.APP}
              component={Demo}
            />
          </Switch>
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Loading...
          </div>
        )}
      </div>
      <SnackBar
        position={{ vertical: 'bottom', horizontal: 'left' }}
        duration={3000}
      />
    </>
  );
}

export default App;
