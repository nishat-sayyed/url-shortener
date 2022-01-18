import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';
import { Url } from '../types';

const Home = () => {
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<any, AxiosResponse<Url>>(
        '/api/url/' + code
      );
      // window.location.replace(data.sanitizedLongUrl);
    })();
  }, []);

  return (
    <div className="App-header">
      <p>Redirecting...</p>
    </div>
  );
};

export default Home;
