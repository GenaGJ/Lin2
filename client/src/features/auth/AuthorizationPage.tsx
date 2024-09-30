/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import type { User } from './types';
import { useAppDispatch } from '../../redux/store';
import { signIn } from './authSlice';

const AuthorizationPage = (): JSX.Element => {
  const [name, setLogin] = useState('');
  const [password, setPasssword] = useState('');

  const dispatch = useAppDispatch();

 
  return (
    <div>
      <h1>AuthorizationPage</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        dispatch(signIn({name,password})).catch(console.log)
      }}>
        <input value={name} onChange={(e) => setLogin(e.target.value)} type="text" />
        <input value={password} onChange={(e) => setPasssword(e.target.value)} type="text" />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default AuthorizationPage;
