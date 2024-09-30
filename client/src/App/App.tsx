import React, { useEffect, useMemo, useReducer, useState } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import ServersListPage from '../features/servers/ServersListPage';

import NavBar from '../features/nav/NavBar';

import { useAppDispatch } from '../redux/store';

import AuthorizationPage from '../features/auth/AuthorizationPage';

import { loadServers, stopLoading } from '../features/servers/serversSlice';
import { checkUser } from '../features/auth/authSlice';
import FormUppdateServer from '../features/servers/FormUppdateServer';
// import MyCalendar from '../features/calendar/MyCalendar';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadServers()).catch(console.log);
    dispatch(checkUser()).catch(console.log);
    // setTimeout(() => dispatch(stopLoading()), 1000)
  }, []);

  return (
    <div className="App">
      <Routes>
        
        {/* <Route path="/" element={<NavBar />}> */}
        
          <Route path="/" element={<ServersListPage />} />
          
          <Route path="/auth/signIn" element={<AuthorizationPage />} />
          <Route path="/servers/:serverId" element={<FormUppdateServer />} />
           {/* <Route path="/users" element={<MyCalendar/>} /> */}
          <Route path="*" element={<h1>404</h1>} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
