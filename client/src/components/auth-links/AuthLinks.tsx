import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as routes from '../../routes'
import { IStore } from '../../types';
import { userLoggedOut } from '../../redux/actions/auth/actions';

const AuthLinks = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: IStore) => state.auth);

  const logoutHandler = () => {
    dispatch(userLoggedOut());
  };

  return (
    <>
      {authState.currentUser ? (
        <>
          <Link to={routes.HOME} onClick={logoutHandler}>
            Logout
          </Link>
        </>
      ) : (
        <>
          {!authState.isLoading ? (
            <>
              <Link to={routes.LOGIN}>Login</Link>
              <span style={{ padding: '0 0.2rem' }}>/</span>
              <Link style={{ fontWeight: 'bold' }} to={routes.REGISTER}>
                Register
              </Link>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default AuthLinks;
