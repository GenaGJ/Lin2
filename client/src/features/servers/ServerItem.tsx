/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { Server } from './types';
// import { appContext } from '../../context';
import { useAppDispatch } from '../../redux/store';
import { removeServer } from './serversSlice';
import { type RootState } from '../../redux/store';
import './styles/server.scss';

const UserItem = ({ server }: { server: Server }): JSX.Element => {
  // const { dispatch } = useContext(appContext);
  const dispatch = useAppDispatch();
  const formatNumber = (number: string): string => {
    if (Number(number) > 9999) {
      return `${(Number(number) / 1000).toFixed(0)}k`;
    }
    return number;
  };
  const user = useSelector((state: RootState) => state.auth.auth);

  // const onHendRemoveUser = async (id: UserId): Promise<void> => {
  //   const res = await fetch(`/api/users/${id}`, {
  //     method: 'DELETE',
  //   });
  //   const data: { message: string; userId: UserId } = (await res.json()) as {
  //     message: string;
  //     userId: UserId;
  //   };
  //   if (data.message === 'seccess') {
  //     dispatch({ type: 'users/remove', payload: data.userId });
  //   }
  // };

  return (
    <div>
      <div className="oneServer">
        {server.desc === 'TOP' &&  (
        <div className='nameANDIcon'>
          <svg
            className="iconNew"
            width="40px"
            height="32px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="rgb(255 169 51)" d="M0 0h24v24H0z" />
              <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 5.5v7h2v-7h-2zm-.285 0H8.601l-1.497 4.113L5.607 8.5H3.493l2.611 6.964h2L10.715 8.5zm5.285 5h1.5a2.5 2.5 0 1 0 0-5H14v7h2v-2zm0-2v-1h1.5a.5.5 0 1 1 0 1H16z" />
            </g>
          </svg>
      
        <a href={`https://${server.address}`}>
          {' '}
          <div style={{ color: 'rgb(255 169 51)' }} className="serName">
            {server.name}
          </div>
        </a>
          </div>
          )}
          {server.desc === 'LOU' && (
           <div className='nameANDIcon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" fill="rgb(255 169 51)"> </circle></svg>
        
        
          <a href={`https://${server.address}`}>
            {' '}
            <div style={{ color: '#558ac7' }} className="serName">
              {server.name}
            </div>
          </a>
            </div>


          )}
          {server.desc === 'BOMJ' && (
            <div className='nameANDIcon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="1.5" fill="#AAAAAA"> </circle></svg>
        
          <a href={`https://${server.address}`}>
            {' '}
            <div style={{ color: 'gray' , fontSize:'12px' }} className="serName">
              {server.name}
            </div>
          </a>
            </div>

          )}




        <div className="oneServertoo" style={{ color: 'gray' }}>
          {/* <div className=""> */}
          <div className="treeO">x{formatNumber(server.rating)}</div>
          <div className="treeT">{server.chronicles} </div>

          <div className="treeF">
            {' '}
            {server.openAt.toString().slice(2, 10).split('-').reverse().join('.')}{' '}
          </div>
          {/* </div> */}
        </div>
      </div>
      {user && (
        <>
          <button type="button" onClick={() => dispatch(removeServer(server.id))}>
            УДАЛИТЬ
          </button>

          <div>
            <h1>
              <Link to={`/servers/${server.id}`}> Обновить</Link>
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default UserItem;
