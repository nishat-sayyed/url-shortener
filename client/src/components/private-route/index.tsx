import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import * as routes from '../../routes';

interface IPrivateRoute {
  isLoggedIn: boolean;
}
const PrivateRoute: FC<IPrivateRoute & RouteProps> = ({
  isLoggedIn,
  ...rest
}) => {
  return isLoggedIn ? <Route {...rest} /> : <Redirect to={routes.LOGIN} />;
};

export default PrivateRoute;
