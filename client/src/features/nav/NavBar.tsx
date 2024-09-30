/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import React from "react"
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../redux/store';
import { logOut } from '../auth/authSlice';

import 'react-calendar/dist/Calendar.css';
import { loadServers, setFilterParams, setTopServersFilter } from '../servers/serversSlice';
import type { Server } from '../servers/types';

import './styles/nav.scss';
// export default function CalendarGfg() {

//     return (
//         <div>
//             <h1>Calendar - GeeksforGeeks</h1>
//             <Calendar
//                 onChange={onChange}
//                 value={value}
//             />
//         </div>
//     );
// }

const NavBar = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [valuez, setValue] = useState(new Date());
  const [rate, setRate] = useState('');
  const [chronicle, setChronicle] = useState('');
  const selectedLanguage = useSelector((state:RootState) => state.servers.selectedLanguage)
  const handlePlus = (key: keyof Server, stro: string, newValue: string): void => {
    dispatch(setFilterParams({ key, stro: chronicle, value: newValue }));

    dispatch(setTopServersFilter());
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCalendarChange = (value: any): void => {
    if (value instanceof Date) {
      setValue(value); // Обновляем локальное состояние
      // Вызываем setFilterParams сым значением даты
      dispatch(setFilterParams({ key: 'openAt', stro: '', value: value.toLocaleDateString() }));
      dispatch(setTopServersFilter());
    }
  };
  const user = useSelector((store: RootState) => store.auth.auth);

  return (
    <div  className='navBarr'>
      
        <div className='cC'>
          <div className="croniclesLane">
            <div>
              <button
                type="button" className='butt'
                onClick={() => handlePlus('chronicles', chronicle, 'Interlude')}
              >
                {' '}
                INTERLUDE
              </button>
            </div>
            <div>
              <button
                type="button" className='butt'
                onClick={() => handlePlus('chronicles', chronicle, 'Interlude+')}
              >
                {' '}
                INTERLUDE+
              </button>
            </div>
          </div>
          <div className="croniclesLane">
            <div>
              <button
                type="button" className='butt'
                onClick={() => handlePlus('chronicles', chronicle, 'High Five')}
              >
                {' '}
                HIGH FIVE
              </button>
            </div>
            <div>
              <button type="button" className='butt' onClick={() => handlePlus('chronicles', chronicle, 'Classic')}>
                {' '}
                CLASSIC
              </button>
            </div>
          </div>
          <div className="croniclesLane">
            <div>
              <button type="button" className='butt' onClick={() => handlePlus('chronicles', chronicle, 'Essence')}>
                {' '}
                ESSENCE
              </button>
            </div>
            <div>
              <button type="button" className='butt' onClick={() => handlePlus('chronicles', chronicle, 'C4')}>
                {' '}
                C4
              </button>
            </div>
          </div>
        </div>
        <div className='filterMax'>
          <div  >
            <select className='filterInput' onChange={(e) => setRate(e.target.value)}>
              <option value=""> {selectedLanguage === 'en' ?('All rates'):(
           'Все рейты')}
                </option>
              <option value="1-10">х1-х10</option>
              <option value="50-100">х50-х100</option>
              <option value="100-1000">х100-х1000</option>
              <option value="1000-2000">х1000-х2000</option>
              <option value="2000-100000000">х2000+</option>
              {/* <option value ='2000-100000000'>RVR</option> */}
            </select>
          </div>
          <div>
            <select className='filterInput' onChange={(e) => setChronicle(e.target.value)}>
              <option value=""> {selectedLanguage === 'en' ?('All chronicles'):(
           'Все хроники')}</option>
              <option>Interlude</option>
              <option>High Five</option>
              <option>Essence</option>
              <option>Interlude+</option>
              <option>Classic</option>
              <option>C4</option>
              <option>Final</option>
              <option>GoD</option>
              <option>C5</option>
              <option>Freya</option>
              <option>Ertheia</option>
              <option>Helios</option>
            </select>
          </div>
          <button type="button" className = "filterButt"onClick={() => handlePlus('name', chronicle, rate)}>
            {' '}
            {selectedLanguage === 'en' ?('SEARCH'):(
           'ПОДОБРАТЬ СЕРВЕР')}
          </button>
        </div>
        <div className='cC'>
        <div className='croniclesLane'>
          <div>
            <button type="button"  className='butt' onClick={() => handlePlus('desc', chronicle, 'TOP')}>
              {' '}
              {selectedLanguage === 'en' ?('L2 TOP SERVERS'):
           ('ТОП СЕРВЕРА Л2')}
             
            </button>
          
        </div>
        
          <div>
            <button type="button" className='butt' onClick={() => handlePlus('rating', chronicle, '11')}>
              {' '}
              {selectedLanguage === 'en' ?('LOW RATE'):(
           'LOW РЕЙТ')}
             
            </button>
          </div>
        </div>
        <div>
          <div>
            <button type="button" className='butt' onClick={() => handlePlus('rating', chronicle, '101')}>
              {' '}
              {selectedLanguage === 'en' ?('PVP SERVERS'):(
           'PVP СЕРВЕРА')}
              
            </button>
          </div>
        </div>
        </div>
        <div className="dateContainer">
          <div className="dateLane">
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '1')}>
                {' '}
                x1
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '3')}>
                {' '}
                x3
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '5')}>
                {' '}
                x5
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '7')}>
                {' '}
                x7
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '10')}>
                {' '}
                x10
              </button>
            </div>
          </div>
          <div className="dateLane">
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '50')}>
                {' '}
                x50
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '100')}>
                {' '}
                x100
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '1000')}>
                {' '}
                x1000
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati'onClick={() => handlePlus('rating', chronicle, '1200')}>
                {' '}
                x1200
              </button>
            </div>
          </div>{' '}
          <div className="dateLane">
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '10000')}>
                {' '}
                x10000
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '50000')}>
                {' '}
                x50000
              </button>
            </div>
            <div>
              <button type="button" className = 'btnRati' onClick={() => handlePlus('rating', chronicle, '100000')}>
                {' '}
                x100000
              </button>
            </div>
          </div>
        </div>

        <div className='calendar'>
        {selectedLanguage === 'en' ?(<Calendar  onChange={handleCalendarChange} value={valuez} locale="en" />):(
          <Calendar onChange={handleCalendarChange} value={valuez} locale="ru" /> )}
          
        </div>
        {user ? (
          <>
            <li>Привет {user.name}</li>

            <li
              onClick={() => {
                dispatch(logOut()).catch(console.log);
                navigate('/');
              }}
            >
              <NavLink className="nav_link" to="">
                LOGOUT
              </NavLink>
            </li>
          </>
        ) : (
          <div className='in'>
          <li>
            <NavLink className="nav_link" to="/auth/signIn">
              ВОЙТИ
            </NavLink>
          </li>
         </div> 
        )}

        {/* <li>
          <NavLink className="nav_link" to="/servers">
            Servers
          </NavLink>
        </li> */}
      
    </div>
  );
};

export default NavBar;
